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

  const querySearch = query.search
  const queryPagination = query.page ? parseInt(query.page as string) - 1 : 0
  const queryCategory = query.category

  const {
    hits,
    nbHits,
    nbPages,
    page: currentPage,
  } = await algoliaClient.search(querySearch as string, {
    page: queryPagination,
    filters: `category.slug: ${queryCategory}`,
  })

  const headline = []
  if (querySearch) headline.push(querySearch)
  if (queryCategory) headline.push(queryCategory)

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
