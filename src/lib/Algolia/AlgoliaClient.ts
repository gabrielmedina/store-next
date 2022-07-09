import algoliasearch from 'algoliasearch'

type TAlgoliaClientProps = {
  index: string
  apiKey?: string
}

export const getAlgoliaClient = ({
  index,
  apiKey = process.env.ALGOLIA_API_KEY!
}: TAlgoliaClientProps) => {
  const client = algoliasearch(
    process.env.ALGOLIA_APPLICATION_ID!,
    apiKey
  )

  return client.initIndex(index)
}
