import { getApolloClient } from 'src/libs'
import { GET_CATEGORY_BY_SLUG } from 'src/graphql'
import { ParsedUrlQuery } from 'querystring'

type TFetchProductFromApolloProps = {
  query: ParsedUrlQuery
}

export const fetchCategoryFromApollo = async ({
  query,
}: TFetchProductFromApolloProps) => {
  const apolloClient = getApolloClient()

  const {
    loading,
    data: { category },
  } = await apolloClient.query({
    query: GET_CATEGORY_BY_SLUG,
    variables: {
      slug: query.category,
    },
  })

  return {
    loading,
    category,
  }
}
