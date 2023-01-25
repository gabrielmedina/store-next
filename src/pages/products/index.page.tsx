import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Container, EmptyState, LayoutSearch, Pagination } from 'src/components'
import {
  ProductCart,
  ProductSearchHeadline,
  ProductSearchList,
} from 'src/features/Product/components'
import { fetchProductsFromAlgolia } from 'src/features/Product/api'
import { Category, Product } from 'src/graphql'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const response = await fetchProductsFromAlgolia({ query })

  return {
    props: response,
  }
}

export type TProductsPageProps = {
  loading?: boolean
  headline?: string
  products: {
    total: number
    data: Array<Product>
  }
  category?: Category
  pages: {
    total: number
    current: number
  }
}

const ProductsPage: NextPage<TProductsPageProps> = ({
  loading,
  headline,
  products,
  category,
  pages,
}) => {
  const renderProductList = () => {
    if (loading)
      return (
        <Container>
          <p>Loading...</p>
        </Container>
      )

    if (products.total === 0)
      return (
        <Container>
          <EmptyState
            image={{
              fill: true,
              src: '/empty-search.svg',
              alt: 'Empty search illustration',
            }}
            title={`No results found for "${headline}"`}
            text="We couldn't find what you searched for. Please, try searching again."
          />
        </Container>
      )

    return (
      <>
        {category && (
          <Container>
            <ProductSearchHeadline category={category} />
          </Container>
        )}

        <Container>
          <ProductSearchList
            headline={headline}
            total={products.total}
            products={products.data}
          />
        </Container>

        <Container>
          <Pagination total={pages.total} current={pages.current} />
        </Container>
      </>
    )
  }

  const head = {
    title: `${category ? category.name : 'Products'} - Store`,
    description: 'The best since 2021. 10001 - New York',
  }

  return (
    <>
      <Head>
        <title>{head.title}</title>
        <meta name="description" content={head.description} />
      </Head>

      <LayoutSearch>{renderProductList()}</LayoutSearch>

      <ProductCart />
    </>
  )
}

export default ProductsPage
