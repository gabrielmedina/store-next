import { NextApiRequest, NextApiResponse } from 'next'
import { request } from 'graphql-request'
import { GET_PRODUCTS_QUERY } from 'src/graphql'
import algoliasearch from 'algoliasearch'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await request(process.env.GRAPHCMS_CONTENT_API!, GET_PRODUCTS_QUERY)

    const algolia = algoliasearch(
      process.env.ALGOLIA_APPLICATION_ID!,
      process.env.ALGOLIA_API_ADMIN_KEY!
    )
    const client = algolia.initIndex('dev_store')

    await client.clearObjects()

    await client.saveObjects(response.products, {
      autoGenerateObjectIDIfNotExist: true
    })

    res.send(200)
  } catch (error) {
    res.status(400).send(error)
  }
}
