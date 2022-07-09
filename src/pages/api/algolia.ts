import { NextApiRequest, NextApiResponse } from 'next'
import { request } from 'graphql-request'
import { GET_PRODUCT_BY_ID } from 'src/graphql'
import algoliasearch from 'algoliasearch'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const Algolia = algoliasearch(
    process.env.ALGOLIA_APPLICATION_ID!,
    process.env.ALGOLIA_API_ADMIN_KEY!
  )
  const algoliaClient = Algolia.initIndex('dev_store')

  try {
    const responseGraphCMS = await getProductFromGraphCMS(req.body.data.id)
    const responseAlgolia = await algoliaClient.search(req.body.data.id)

    await algoliaClient.partialUpdateObjects({
      ...responseGraphCMS.data.product,
      objectID: responseAlgolia.hits[0].objectID
    })

    res.send(200)
  } catch (error) {
    res.status(400).send(error)
  }
}

async function getProductFromGraphCMS(productId: string) {
  return await request(process.env.GRAPHCMS_CONTENT_API!, GET_PRODUCT_BY_ID, {
    variables: {
      id: productId
    }
  })
}
