import type { NextPage } from 'next'
import Head from 'next/head'
import { ProductCart, ProductSearchList } from 'src/features'
import { LayoutDefault } from 'src/components'
import {
  getApolloClient,
  GET_PRODUCTS_QUERY,
  Product,
  GetProdutsQuery,
} from 'src/graphql'

export async function getServerSideProps() {
  const apolloClient = getApolloClient()

  const { loading, data } = await apolloClient.query<GetProdutsQuery>({
    query: GET_PRODUCTS_QUERY,
  })

  return {
    props: {
      loading,
      products: data?.products,
    },
  }
}

type TPageHomeProps = {
  loading?: boolean
  products: Product[]
}

const Home: NextPage<TPageHomeProps> = ({ loading, products }) => {
  return (
    <>
      <Head>
        <title>Store | The best of New York</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LayoutDefault>
        {!loading && <ProductSearchList products={products} />}
      </LayoutDefault>

      <ProductCart />
    </>
  )
}

export default Home
