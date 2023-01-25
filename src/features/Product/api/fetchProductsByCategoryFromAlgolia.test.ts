import { fetchProductsByCategoryFromAlgolia } from './fetchProductsByCategoryFromAlgolia'

const searchMock = jest.fn().mockImplementation(() => {
  return Promise.resolve({
    hits: [],
    nbHits: 10,
    nbPages: 1,
    page: 0,
  })
})

jest.mock('src/libs', () => ({
  getAlgoliaClient: jest.fn().mockImplementation(() => ({
    search: searchMock,
  })),
}))

describe('FetchProductsByCategoryFromAlgolia', () => {
  afterEach(() => jest.clearAllMocks())

  it('should search products with correctly queries', async () => {
    await fetchProductsByCategoryFromAlgolia({
      query: { search: 'term', category: 'caps' },
    })

    expect(searchMock).toBeCalledWith('term', {
      filters: 'category.slug: caps',
      page: 0,
    })
  })

  it('should search products with correctly page', async () => {
    await fetchProductsByCategoryFromAlgolia({
      query: { search: 'term', category: 'caps', page: '2' },
    })

    expect(searchMock).toBeCalledWith('term', {
      filters: 'category.slug: caps',
      page: 1,
    })
  })

  it('should return correctly props', async () => {
    const response = await fetchProductsByCategoryFromAlgolia({
      query: { search: 'term', category: 'caps', page: '2' },
    })

    expect(response).toEqual({
      loading: false,
      headline: 'term, caps',
      pages: {
        current: 0,
        total: 1,
      },
      products: {
        data: [],
        total: 10,
      },
    })
  })
})
