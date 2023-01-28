import { render, screen, within } from '@testing-library/react'
import { GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import {
  useProductCartStateMock,
  useProductCartStateMockReturn,
} from 'test/_mocks/useProductCartStateMock'
import { fetchProductsFromAlgolia } from 'src/features/Product/api'
import ProductsStub from 'test/_stubs/ProductsStub.json'
import CategoriesStub from 'test/_stubs/CategoriesStub.json'
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
  category,
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
      category={category}
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

  it('should render category headline correctly', () => {
    const category = CategoriesStub[0]
    const products = ProductsStub

    makeSut({
      // @ts-ignore
      category,
      headline: 'caps',
      products: {
        total: products.length,
        // @ts-ignore
        data: products,
      },
    })

    expect(
      screen.getByRole('heading', { level: 1, name: category.name })
    ).toBeInTheDocument()
    expect(screen.getByText(category.description)).toBeInTheDocument()
  })

  it('should render breadcrumb correctly', () => {
    const category = CategoriesStub[0]
    const products = ProductsStub

    makeSut({
      // @ts-ignore
      category,
      headline: 'caps',
      products: {
        total: products.length,
        // @ts-ignore
        data: products,
      },
    })

    const breadcrumb = screen.getByTestId('breadcrumb')

    expect(
      within(breadcrumb).getByRole('link', { name: 'Products' })
    ).toBeInTheDocument()
    expect(
      within(breadcrumb).getByRole('link', { name: category.name })
    ).toBeInTheDocument()
  })

  it('should call fetchProductsFromAlgolia in getServerSideProps', async () => {
    const context = {
      query: { page: '2' } as ParsedUrlQuery,
    }

    await getServerSideProps(context as GetServerSidePropsContext)

    expect(fetchProductsFromAlgolia).toBeCalledWith(context)
  })
})
