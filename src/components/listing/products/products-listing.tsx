import { ProductsListingItem } from './products-listing-item'
import { TProduct } from './types'

type TProductsListingProps = {
  products: []
}

export const ProductsListing: React.FC<TProductsListingProps> = ({
  ...props
}) => {
  const { products } = props

  return (
    <ol>
      {products.map((product: TProduct) => (
        <li key={product.id}>
          <ProductsListingItem product={product} />
        </li>
      ))}
    </ol>
  )
}
