import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Breadcrumb, Container, LayoutDefault } from 'src/components'
import { ProductCart, ProductDetail } from 'src/features/Product/components'
import { fetchProductFromApollo } from 'src/features/Product/api'
import { Product } from 'src/graphql'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const response = await fetchProductFromApollo({ query })

  return {
    props: response,
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
