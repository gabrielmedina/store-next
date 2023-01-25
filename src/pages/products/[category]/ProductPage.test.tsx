import { render, screen } from '@testing-library/react'
import {
  useProductCartStateMock,
  useProductCartStateMockReturn,
} from 'test/_mocks/useProductCartStateMock'
import { GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import ProductsStub from 'test/_stubs/ProductsStub.json'
import { fetchProductFromApollo } from 'src/features/Product/api'
import ProductPage, {
  getServerSideProps,
  TProductPageProps,
} from './[slug].page'

const product = ProductsStub[0]

const onApolloClientQuery = jest.fn().mockImplementation(() => ({
  loading: false,
  data: {
    product,
  },
}))

jest.mock('src/libs', () => ({
  getApolloClient: jest.fn().mockImplementation(() => {
    return {
      query: onApolloClientQuery,
    }
  }),
}))

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: `/product/${product.slug}`,
    }
  },
}))

jest.mock('src/features/Product/api')

const makeSut = (props: TProductPageProps) => {
  return render(<ProductPage {...props} />)
}

describe('ProductPage', () => {
  beforeEach(() => {
    useProductCartStateMock.mockReturnValue(useProductCartStateMockReturn)
  })

  it('should render correctly', () => {
    // @ts-ignore
    makeSut({ loading: false, product })

    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument()
    expect(screen.getByTestId('product-detail')).toBeInTheDocument()
  })

  it('should render Breadcrumb correctly', () => {
    // @ts-ignore
    makeSut({ loading: false, product })

    expect(screen.getByRole('link', { name: 'Products' })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: product.category.name })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: product.name })).toBeInTheDocument()
  })

  it('should no render ProductDetail when loading is true', () => {
    // @ts-ignore
    makeSut({ loading: true, product })

    expect(screen.queryByTestId('product-detail')).not.toBeInTheDocument()
  })

  it('should call fetchProductFromApollo in getServerSideProps', () => {
    const context = {
      query: { slug: product.slug } as ParsedUrlQuery,
    }

    getServerSideProps(context as GetServerSidePropsContext)

    expect(fetchProductFromApollo).toBeCalledWith(context)
  })
})
