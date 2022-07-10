import { NextApiRequest, NextApiResponse } from 'next'
import { getAlgoliaClient } from 'src/lib'
import { request } from 'graphql-request'
import { GET_PRODUCT_BY_ID } from 'src/graphql'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const algoliaClient = getAlgoliaClient({
    index: 'dev_store',
    apiKey: process.env.ALGOLIA_API_ADMIN_KEY!
  })

  try {
    const responseGraphQL = await request({
      url: process.env.GRAPHCMS_CONTENT_API!,
      document: GET_PRODUCT_BY_ID,
      variables: {
        id: req.body.data.id
      }
    })

    const responseAlgolia = await algoliaClient.search(req.body.data.id)
    const productAlgolia = responseAlgolia.hits[0]

    if (productAlgolia) {
      await algoliaClient.partialUpdateObject({
        ...responseGraphQL.product,
        objectID: responseAlgolia.hits[0].objectID
      })
    } else {
      await algoliaClient.saveObject(responseGraphQL.product, {
        autoGenerateObjectIDIfNotExist: true
      })
    }

    res.send(200)
  } catch (error) {
    res.status(400).send(error)
  }
}
