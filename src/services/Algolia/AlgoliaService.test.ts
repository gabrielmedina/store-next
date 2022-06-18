import { AlgoliaService } from 'src/services'

const searchMethodMock = jest.fn().mockImplementation(() => {
  return Promise.resolve({
    hits: []
  })
})

jest.mock('algoliasearch', () => {
  return jest.fn().mockImplementation(() => {
    return {
      initIndex: jest.fn(() => ({
        search: searchMethodMock,
      }))
    }
  })
})

const algoliaService = new AlgoliaService('index_test')

describe('Services > AlgoliaService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call search method when get is called', async () => {
    await algoliaService.get('term')

    expect(searchMethodMock).toBeCalled()
    expect(searchMethodMock).toBeCalledTimes(1)
    expect(searchMethodMock).toBeCalledWith('term')
  })
})
