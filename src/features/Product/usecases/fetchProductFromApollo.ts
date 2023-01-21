import { getApolloClient } from 'src/libs'
import { GET_PRODUCT_BY_SLUG_QUERY } from 'src/graphql'
import { ParsedUrlQuery } from 'querystring'

type TFetchProductFromApolloProps = {
  query: ParsedUrlQuery
}

export const fetchProductFromApollo = async ({
  query,
}: TFetchProductFromApolloProps) => {
  const apolloClient = getApolloClient()

  const {
    loading,
    data: { product },
  } = await apolloClient.query({
    query: GET_PRODUCT_BY_SLUG_QUERY,
    variables: {
      slug: query.slug,
    },
  })

  return {
    loading,
    product,
  }
}
