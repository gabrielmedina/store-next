import { getAlgoliaClient } from 'src/libs'
import { ParsedUrlQuery } from 'querystring'

type TFetchProductsUseCase = {
  query: ParsedUrlQuery
}

export const fetchProductsUseCase = async ({
  query,
}: TFetchProductsUseCase) => {
  const algoliaClient = getAlgoliaClient({
    index: 'dev_store',
  })

  const querySearch = (query?.search as string) || ''
  const queryPagination = query?.page ? parseInt(query.page as string) - 1 : 0

  const {
    hits,
    nbHits,
    nbPages,
    page: currentPage,
    query: term,
  } = await algoliaClient.search(querySearch, {
    page: queryPagination,
  })

  return {
    loading: false,
    term,
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
