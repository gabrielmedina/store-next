import { ProductSearchItem } from '../Item/ProductSearchItem'
import styles from './ProductSearchList.module.scss'
import { Product } from 'src/graphql'

export type TProductSearchListProps = {
  products: Array<Product>
}

export const ProductSearchList: React.FC<TProductSearchListProps> = ({
  products,
}) => {
  return (
    <ol data-testid="product-search-list" className={styles.list}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductSearchItem product={product} />
        </li>
      ))}
    </ol>
  )
}
