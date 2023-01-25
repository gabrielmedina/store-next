import { render, screen } from '@testing-library/react'
import { GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import {
  useProductCartStateMock,
  useProductCartStateMockReturn,
} from 'test/_mocks/useProductCartStateMock'
import { fetchProductsFromAlgolia } from 'src/features/Product/api'
import ProductsStub from 'test/_stubs/ProductsStub.json'
import ProductsPage, {
  getServerSideProps,
  TProductsPageProps,
} from './index.page'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: `/`,
    }
  },
}))

jest.mock('src/features/Product/api')

const makeSut = ({
  headline,
  products,
  loading = false,
  pages = {
    total: 1,
    current: 0,
  },
}: TProductsPageProps) => {
  return render(
    <ProductsPage
      headline={headline}
      products={products}
      pages={pages}
      loading={loading}
    />
  )
}

describe('ProductsPage', () => {
  beforeEach(() => {
    useProductCartStateMock.mockReturnValue(useProductCartStateMockReturn)
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
      headline: 'animals',
      products: {
        total: 0,
        data: [],
      },
    })

    expect(screen.getByText('No results found for "animals"'))
  })

  it('should call fetchProductsFromAlgolia in getServerSideProps', async () => {
    const context = {
      query: { page: '2' } as ParsedUrlQuery,
    }

    await getServerSideProps(context as GetServerSidePropsContext)

    expect(fetchProductsFromAlgolia).toBeCalledWith(context)
  })
})
