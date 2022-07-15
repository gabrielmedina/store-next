import { render, screen } from '@testing-library/react'
import { GetServerSidePropsContext } from 'next'
import { StateSearchItems } from 'src/features'
import { RecoilMock, TRecoilMockProps } from 'test/_mocks/RecoilMock'
import ProductsStub from 'test/_stubs/ProductsStub.json'
import Home, { getServerSideProps, TPageHomeProps } from './index.page'

const searchMethodMock = jest.fn().mockImplementation(() => {
  return Promise.resolve({
    hits: [],
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

const makeSut = ({
  node,
  values = null,
  products,
  loading = false,
}: TRecoilMockProps & TPageHomeProps) => {
  return render(
    <RecoilMock node={node} values={values} onChange={onRecoilChange}>
      <Home products={products} loading={loading} />
    </RecoilMock>
  )
}

describe('Page Home', () => {
  it('should render correctly', () => {
    makeSut({
      node: StateSearchItems,
      // @ts-ignore
      products: ProductsStub,
    })

    expect(screen.getByTestId('product-search-list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(ProductsStub.length)
  })

  it('should display empty message when product list is empty', () => {
    makeSut({
      node: StateSearchItems,
      products: [],
    })

    expect(screen.getByText('Ops! Product list is empty.'))
  })

  it('should display product by recoil', () => {
    makeSut({
      node: StateSearchItems,
      values: ProductsStub,
      products: [],
    })

    expect(screen.getAllByRole('listitem')).toHaveLength(ProductsStub.length)
  })

  it('should call algoliasearch search with ""', () => {
    makeSut({
      node: StateSearchItems,
      products: [],
    })

    getServerSideProps({} as GetServerSidePropsContext)

    expect(searchMethodMock).toBeCalledWith('')
  })
})
