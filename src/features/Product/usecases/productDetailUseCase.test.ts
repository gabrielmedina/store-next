import { productDetailUseCase } from './productDetailUseCase'
import ProductsStub from 'test/_stubs/ProductsStub.json'
import { ParsedUrlQuery } from 'querystring'
import { GET_PRODUCT_BY_SLUG_QUERY } from 'src/graphql'

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

describe('ProductDetailUseCase', () => {
  it('should search product with correctly queries', async () => {
    const context = {
      query: { slug: product.slug } as ParsedUrlQuery,
    }

    await productDetailUseCase({ query: context.query })

    expect(onApolloClientQuery).toBeCalledWith({
      query: GET_PRODUCT_BY_SLUG_QUERY,
      variables: {
        slug: product.slug,
      },
    })
  })

  it('should return correctly props', async () => {
    const context = {
      query: { slug: product.slug } as ParsedUrlQuery,
    }

    const response = await productDetailUseCase({ query: context.query })

    expect(response).toEqual(
      expect.objectContaining({
        loading: false,
        product,
      })
    )
  })
})
