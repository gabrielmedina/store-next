import { GetServerSideProps } from 'next'
import { fetchProductsByCategoryFromAlgolia } from 'src/features/Product/api'
import { Product } from 'src/graphql'
import ProductsPage from 'src/pages/products/index.page'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const response = await fetchProductsByCategoryFromAlgolia({ query })

  return {
    props: response,
  }
}

export type TProductsPageProps = {
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

export default ProductsPage
