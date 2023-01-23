import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProductSearchForm } from './ProductSearchForm'

const pushMock = jest.fn()

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn().mockImplementation(() => ({
    push: pushMock,
  })),
}))

const makeSut = () => {
  return render(<ProductSearchForm />)
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

    const term = 'rolex'
    const input = screen.getByRole('searchbox')
    const user = userEvent.setup()

    await user.type(input, term)

    await waitFor(() => {
      expect(pushMock).toBeCalledWith({
        pathname: '/products',
        query: {
          search: term,
        },
      })
    })
  })
})
