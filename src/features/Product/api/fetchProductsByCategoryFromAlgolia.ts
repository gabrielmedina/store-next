import { getAlgoliaClient } from 'src/libs'
import { ParsedUrlQuery } from 'querystring'

type TFetchProductsFromAlgolia = {
  query: ParsedUrlQuery
}

export const fetchProductsByCategoryFromAlgolia = async ({
  query,
}: TFetchProductsFromAlgolia) => {
  const algoliaClient = getAlgoliaClient({
    index: 'dev_store',
  })

  algoliaClient.setSettings({
    attributesForFaceting: ['searchable(category.slug)'],
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
    filters: `category.slug: ${query.category}`,
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
