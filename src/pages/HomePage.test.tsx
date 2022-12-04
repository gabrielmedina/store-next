import { render, screen } from '@testing-library/react'
import { GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { useCartMock, useCartMockReturn } from 'test/_mocks/useCartMock'
import { productSearchUseCase } from 'src/features/Product/usecases'
import ProductsStub from 'test/_stubs/ProductsStub.json'
import HomePage, { getServerSideProps, TPageHomeProps } from './index.page'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: `/`,
    }
  },
}))

jest.mock('src/features/Product/usecases')

const makeSut = ({
  products,
  loading = false,
  pages = {
    total: 1,
    current: 0,
  },
}: TPageHomeProps) => {
  return render(
    <HomePage products={products} pages={pages} loading={loading} />
  )
}

describe('HomePage', () => {
  beforeEach(() => {
    useCartMock.mockReturnValue(useCartMockReturn)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    makeSut({
      products: {
        total: ProductsStub.length,
        // @ts-ignore
        data: ProductsStub,
      },
    })

    expect(screen.getByTestId('product-search-list')).toBeInTheDocument()
    expect(screen.getAllByTestId('product-search-list-item')).toHaveLength(
      ProductsStub.length
    )
  })

  it('should display loading message when page is loading', () => {
    // @ts-ignore
    makeSut({ loading: true })

    expect(screen.getByText('Loading...'))
  })

  it('should display empty message when product list is empty', () => {
    // @ts-ignore
    makeSut({
      products: {
        total: 0,
        data: [],
      },
    })

    expect(screen.getByText('Ops! No results found.'))
  })

  it('should call searchProductUseCase in getServerSideProps', () => {
    const page = '2'
    const context = {
      query: { page } as ParsedUrlQuery,
    }

    getServerSideProps(context as GetServerSidePropsContext)

    expect(productSearchUseCase).toBeCalledWith(context)
  })
})
