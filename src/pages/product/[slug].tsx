import { FC } from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { LayoutDefault } from 'src/components'
import { ProductCart, ProductDetail } from 'src/features'
import { getApolloClient, GET_PRODUCT_QUERY, Product } from 'src/graphql'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const apolloClient = getApolloClient()

  const {
    loading,
    data: { product },
  } = await apolloClient.query({
    query: GET_PRODUCT_QUERY,
    variables: {
      slug: query.slug,
    },
  })

  return {
    props: {
      loading,
      product,
    },
  }
}

type TProductPageProps = {
  loading: boolean
  product: Product
}

const ProductPage: FC<TProductPageProps> = ({ loading, product }) => {
  return (
    <>
      <Head>
        <title>{product.name} | Store</title>
        <meta name="description" content={product.description || undefined} />
      </Head>

      <LayoutDefault>
        {!loading && (
          <main>
            <ProductDetail product={product} />
          </main>
        )}
      </LayoutDefault>

      <ProductCart />
    </>
  )
}

export default ProductPage
