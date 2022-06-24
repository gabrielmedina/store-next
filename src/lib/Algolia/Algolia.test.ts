import { Algolia } from 'src/lib'

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

describe('Algolia', () => {
  const algolia = new Algolia('index_test')

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should set algoliasearch _index correctly', () => {
    expect(indexMock).toBeCalled()
    expect(indexMock).toBeCalledWith('index_test')
  })

  it('should call algoliasearch search method when get is called', async () => {
    await algolia.get('term')

    expect(searchMethodMock).toBeCalled()
    expect(searchMethodMock).toBeCalledTimes(1)
    expect(searchMethodMock).toBeCalledWith('term')
  })
})
