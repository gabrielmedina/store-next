import { render, screen } from '@testing-library/react'
import { useCartMock, useCartMockReturn } from 'test/_mocks/useCartMock'
import ProductPage, {
  getServerSideProps,
  TProductPageProps,
} from './[slug].page'
import { GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { GET_PRODUCT_BY_SLUG_QUERY } from 'src/graphql'
import ProductsStub from 'test/_stubs/ProductsStub.json'

const product = ProductsStub[0]

const onApolloClientQuery = jest.fn().mockImplementation(() => ({
  loading: false,
  data: {
    product,
  },
}))

jest.mock('src/lib', () => ({
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

const makeSut = (props: TProductPageProps) => {
  return render(<ProductPage {...props} />)
}

describe('ProductPage', () => {
  beforeEach(() => {
    useCartMock.mockReturnValue(useCartMockReturn)
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

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: product.name })).toBeInTheDocument()
  })

  it('should no render ProductDetail when loading is true', () => {
    // @ts-ignore
    makeSut({ loading: true, product })

    expect(screen.queryByTestId('product-detail')).not.toBeInTheDocument()
  })

  it('should call apollo client query on server side correctly', async () => {
    const context = {
      query: { slug: product.slug } as ParsedUrlQuery,
    }

    const response = await getServerSideProps(
      context as GetServerSidePropsContext
    )

    expect(onApolloClientQuery).toBeCalledWith({
      query: GET_PRODUCT_BY_SLUG_QUERY,
      variables: {
        slug: product.slug,
      },
    })

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          loading: false,
          product,
        },
      })
    )
  })
})
