import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { Breadcrumb, Container, LayoutDefault } from 'src/components'
import { ProductCart, ProductDetail } from 'src/features'
import { getApolloClient } from 'src/lib'
import { GET_PRODUCT_BY_SLUG_QUERY, Product } from 'src/graphql'
import { useRouter } from 'next/router'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const apolloClient = getApolloClient()

  const {
    loading,
    data: { product },
  } = await apolloClient.query({
    query: GET_PRODUCT_BY_SLUG_QUERY,
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

export type TProductPageProps = {
  loading: boolean
  product: Product
}

const ProductPage: React.FC<TProductPageProps> = ({ loading, product }) => {
  const router = useRouter()

  const breadcrumb = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: product.name,
      path: router.asPath,
      isCurrent: true,
    },
  ]

  if (loading) return null

  return (
    <>
      <Head>
        <title>{product.name} | Store</title>
        <meta name="description" content={product.description!} />
      </Head>

      <LayoutDefault>
        <Container size="small">
          <Breadcrumb items={breadcrumb} />
        </Container>

        <main>
          <Container size="small">
            <ProductDetail product={product} />
          </Container>
        </main>
      </LayoutDefault>

      <ProductCart />
    </>
  )
}

export default ProductPage
