import { AlgoliaService } from 'src/services'

const searchMethodMock = jest.fn().mockImplementation(() => {
  return Promise.resolve({
    hits: []
  })
})

const indexMock = jest.fn(() => ({
  search: searchMethodMock,
}))

jest.mock('algoliasearch', () => {
  return jest.fn().mockImplementation(() => {
    return {
      initIndex: indexMock
    }
  })
})

describe('AlgoliaService', () => {
  const algoliaService = new AlgoliaService('index_test')

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should set algoliasearch _index correctly', () => {
    expect(indexMock).toBeCalled()
    expect(indexMock).toBeCalledWith('index_test')
  })

  it('should call algoliasearch search method when get is called', async () => {
    await algoliaService.get('term')

    expect(searchMethodMock).toBeCalled()
    expect(searchMethodMock).toBeCalledTimes(1)
    expect(searchMethodMock).toBeCalledWith('term')
  })
})
