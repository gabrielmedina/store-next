import { getApolloClient } from './ApolloClient'

describe('apolloClient', () => {
  it('should return apollo cache', () => {
    const apolloState = {
      products: [{ id: '1' }],
    }

    Object.defineProperty(window, '__NEXT_DATA__', {
      writable: true,
      value: {
        apolloState,
      },
    })

    const client = getApolloClient()
    expect(client.cache.extract()).toStrictEqual(apolloState)

    // define new next data cache
    Object.defineProperty(window, '__NEXT_DATA__', {
      writable: true,
      value: {
        apolloState: null,
      },
    })

    expect(client.cache.extract()).toStrictEqual(apolloState)

    const clientForceNew = getApolloClient({ forceNew: true })
    expect(clientForceNew.cache.extract()).toStrictEqual({})

    const exisitingClient = getApolloClient()
    expect(exisitingClient.cache.extract()).toStrictEqual({})
  })
})
