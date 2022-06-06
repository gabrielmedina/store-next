import { ProductSearchItem } from '../Item/ProductSearchItem'
import { TProduct } from 'src/features/Product/types'

type TProductSearchListProps = {
  products: Array<TProduct>
}

export const ProductSearchList: React.FC<TProductSearchListProps> = ({
  products,
}) => {
  return (
    <ol>
      {products.map((product) => (
        <li key={product.id}>
          <ProductSearchItem product={product} />
        </li>
      ))}
    </ol>
  )
}
