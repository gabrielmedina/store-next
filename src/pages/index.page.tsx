import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Container, EmptyState, LayoutSearch, Pagination } from 'src/components'
import { ProductCart, ProductSearchList } from 'src/features/Product/components'
import { fetchProductsFromAlgolia } from 'src/features/Product/api'
import { Product } from 'src/graphql'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const response = await fetchProductsFromAlgolia({ query })

  return {
    props: response,
  }
}

export type TPageSearchProps = {
  loading?: boolean
  term?: string
  products: {
    total: number
    data: Array<Product>
  }
  pages: {
    total: number
    current: number
  }
}

const SearchPage: NextPage<TPageSearchProps> = ({
  loading,
  term,
  products,
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
            title={`No results found for "${term}"`}
            text="We couldn't find what you searched for. Please, try searching again."
          />
        </Container>
      )

    return (
      <>
        <Container>
          <ProductSearchList
            term={term}
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

  return (
    <>
      <Head>
        <title>Store | The best of New York</title>
        <meta
          name="description"
          content="The best since 2021. 10001 - New York"
        />
      </Head>

      <LayoutSearch>{renderProductList()}</LayoutSearch>

      <ProductCart />
    </>
  )
}

export default SearchPage
