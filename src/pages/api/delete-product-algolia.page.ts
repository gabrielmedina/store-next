import { NextApiRequest, NextApiResponse } from 'next'
import { getAlgoliaClient } from 'src/lib'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const algoliaClient = getAlgoliaClient({
    index: 'dev_store',
    apiKey: process.env.ALGOLIA_API_ADMIN_KEY!,
  })

  try {
    const responseAlgolia = await algoliaClient.search(req.body.data.id)
    const productAlgolia = responseAlgolia.hits[0]

    if (productAlgolia) {
      await algoliaClient.deleteObject(productAlgolia.objectID)
    }

    res.send(200)
  } catch (error) {
    res.status(400).send(error)
  }
}
