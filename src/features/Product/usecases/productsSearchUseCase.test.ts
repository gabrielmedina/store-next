import { productsSearchUseCase } from './productsSearchUseCase'

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

describe('ProductsSearchUseCase', () => {
  afterEach(() => jest.clearAllMocks())

  it('should search products with correctly queries', async () => {
    await productsSearchUseCase({ query: { search: 'term' } })

    expect(searchMock).toBeCalledWith('term', { page: 0 })
  })

  it('should search products with correctly page', async () => {
    await productsSearchUseCase({ query: { search: 'term', page: '2' } })

    expect(searchMock).toBeCalledWith('term', { page: 1 })
  })

  it('should return correctly props', async () => {
    const response = await productsSearchUseCase({
      query: { search: 'term', page: '2' },
    })

    expect(response).toEqual({
      loading: false,
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