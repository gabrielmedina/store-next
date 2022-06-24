import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch'

export class Algolia {
  _client: SearchClient;
  _index: SearchIndex;

  constructor(index: string) {
    this._client = algoliasearch(
      process.env.ALGOLIA_APPLICATION_ID!,
      process.env.ALGOLIA_API_KEY!
    )

    this._index = this._client.initIndex(index)
  }

  async get(term: string) {
    const response = await this._index.search(term)

    return response
  }
}
