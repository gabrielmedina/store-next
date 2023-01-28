import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Breadcrumb, Container, LayoutSearch } from 'src/components'
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
      title: 'Products',
      path: '/products',
      isCurrent: false,
    },
    product.category
      ? {
          title: product.category.name,
          path: `/products/${product.category.slug}`,
          isCurrent: false,
        }
      : undefined,
    {
      title: product.name,
      path: router.asPath,
      isCurrent: true,
    },
  ]

  const head = {
    title: `${product.name} - Store`,
    description: product.description,
  }

  if (loading) return null

  return (
    <>
      <Head>
        <title>{head.title}</title>
        <meta name="description" content={head.description!} />
      </Head>

      <LayoutSearch>
        <Container>
          <Breadcrumb items={breadcrumb} />
        </Container>

        <main>
          <Container>
            <ProductDetail product={product} />
          </Container>
        </main>
      </LayoutSearch>

      <ProductCart />
    </>
  )
}

export default ProductPage
