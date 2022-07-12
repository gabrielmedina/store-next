import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
} from '@apollo/client'
import { NEXT_DATA } from 'next/dist/shared/lib/utils'
import fetch from 'cross-fetch'

type TGetApolloClientOptions = {
  forceNew?: boolean
}

const isServer = typeof window === 'undefined'

let apolloClient: ApolloClient<NormalizedCacheObject>

const httpLink = createHttpLink({
  uri: process.env.HYGRAPH_CONTENT_API,
  credentials: 'same-origin',
  fetch,
})

export function getApolloClient({
  forceNew = false,
}: TGetApolloClientOptions = {}) {
  if (!forceNew && apolloClient) return apolloClient

  const windowApolloState =
    !isServer &&
    // eslint-disable-next-line no-underscore-dangle
    (window.__NEXT_DATA__ as NEXT_DATA & { apolloState: NormalizedCacheObject })
      ?.apolloState

  apolloClient = new ApolloClient({
    ssrMode: isServer,
    link: httpLink,
    cache: new InMemoryCache().restore(windowApolloState || {}),
  })

  return apolloClient
}
