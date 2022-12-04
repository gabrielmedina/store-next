import { getAlgoliaClient } from 'src/libs'
import { ParsedUrlQuery } from 'querystring'

type TProductSearchUseCase = {
  query: ParsedUrlQuery
}

export const productSearchUseCase = async ({
  query,
}: TProductSearchUseCase) => {
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
  } = await algoliaClient.search(querySearch, {
    page: queryPagination,
  })

  return {
    loading: false,
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
