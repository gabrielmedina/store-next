import { getAlgoliaClient } from 'src/libs'
import { ParsedUrlQuery } from 'querystring'

type TFetchProductsFromAlgolia = {
  query: ParsedUrlQuery
}

export const fetchProductsFromAlgolia = async ({
  query,
}: TFetchProductsFromAlgolia) => {
  const algoliaClient = getAlgoliaClient({
    index: 'dev_store',
  })

  const querySearch = query.search
  const queryPagination = query.page ? parseInt(query.page as string) - 1 : 0

  const {
    hits,
    nbHits,
    nbPages,
    page: currentPage,
  } = await algoliaClient.search(querySearch as string, {
    page: queryPagination,
  })

  const headline = []
  if (querySearch) headline.push(querySearch)

  return {
    loading: false,
    headline: headline.join(', '),
    products: {
      total: nbHits,
      data: hits,
    },
    pages: {
      total: nbPages,
      current: currentPage,
    },
  }
}
