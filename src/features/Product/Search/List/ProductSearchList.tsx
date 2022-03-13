import { ProductSearchItem } from '../Item/ProductSearchItem'
import { TProduct } from '../../types'

type TProductSearchListProps = {
  products: Array<TProduct>
}

export const ProductSearchList: React.FC<TProductSearchListProps> = ({
  ...props
}) => {
  const { products } = props

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
