import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProductSearchForm, StateSearchItems } from 'src/features'
import { RecoilMock } from 'test/_mocks/RecoilMock'
import ProductsStub from 'test/_stubs/ProductsStub.json'

const product = ProductsStub[0]

const searchMethodMock = jest.fn().mockImplementation(() => {
  return Promise.resolve({
    hits: [product],
  })
})

const indexMock = jest.fn(() => ({
  search: searchMethodMock,
}))

jest.mock('algoliasearch', () => {
  return jest.fn().mockImplementation(() => {
    return {
      initIndex: indexMock,
    }
  })
})

const onRecoilChange = jest.fn()

const makeSut = () => {
  return render(
    <RecoilMock node={StateSearchItems} onChange={onRecoilChange}>
      <ProductSearchForm />
    </RecoilMock>
  )
}

describe('ProductSearchForm', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    makeSut()

    const form = screen.getByRole('form')
    expect(form).toBeInTheDocument()
    expect(form).toHaveAttribute('name', 'product-search-form')

    const input = screen.getByRole('searchbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('name', 'search')
    expect(input).toHaveAttribute('placeholder', 'What are you searching for?')
  })

  it('should submit form when user type on input', async () => {
    makeSut()

    const input = screen.getByRole('searchbox')
    const user = userEvent.setup()
    await user.type(input, 'rolex')

    await waitFor(() => {
      expect(onRecoilChange).toHaveBeenLastCalledWith([product])
    })
  })
})
