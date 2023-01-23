import { GetServerSideProps } from 'next'
import {
  fetchCategoryFromApollo,
  fetchProductsByCategoryFromAlgolia,
} from 'src/features/Product/api'
import ProductsPage from 'src/pages/products/index.page'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const products = await fetchProductsByCategoryFromAlgolia({ query })
  const category = await fetchCategoryFromApollo({ query })

  return {
    props: {
      ...products,
      ...category,
    },
  }
}

export default ProductsPage
