import { fetchCategoryFromApollo } from './fetchCategoryFromApollo'
import CategoriesStub from 'test/_stubs/CategoriesStub.json'
import { ParsedUrlQuery } from 'querystring'
import { GET_CATEGORY_BY_SLUG } from 'src/graphql'

const category = CategoriesStub[0]

const onApolloClientQuery = jest.fn().mockImplementation(() => ({
  loading: false,
  data: {
    category,
  },
}))

jest.mock('src/libs', () => ({
  getApolloClient: jest.fn().mockImplementation(() => {
    return {
      query: onApolloClientQuery,
    }
  }),
}))

describe('FetchCategoryFromApollo', () => {
  it('should search category with correctly queries', async () => {
    const context = {
      query: { category: category.slug } as ParsedUrlQuery,
    }

    await fetchCategoryFromApollo({ query: context.query })

    expect(onApolloClientQuery).toBeCalledWith({
      query: GET_CATEGORY_BY_SLUG,
      variables: {
        slug: category.slug,
      },
    })
  })

  it('should return correctly props', async () => {
    const context = {
      query: { slug: category.slug } as ParsedUrlQuery,
    }

    const response = await fetchCategoryFromApollo({ query: context.query })

    expect(response).toEqual(
      expect.objectContaining({
        loading: false,
        category,
      })
    )
  })
})
