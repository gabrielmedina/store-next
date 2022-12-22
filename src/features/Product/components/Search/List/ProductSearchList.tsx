import { ProductSearchItem } from '../Item/ProductSearchItem'
import styles from './ProductSearchList.module.scss'
import { Product } from 'src/graphql'

export type TProductSearchListProps = {
  term?: string
  total?: number
  products: Array<Product>
}

export const ProductSearchList: React.FC<TProductSearchListProps> = ({
  term,
  total,
  products,
}) => {
  const subtitle = () => {
    if (term) return `Search results for: ${term} (${total})`

    return `All products (${total})`
  }

  return (
    <div data-testid="product-search-list">
      {total && <p className={styles.text}>{subtitle()}</p>}

      <ol className={styles.list}>
        {products.map((product) => (
          <li data-testid="product-search-list-item" key={product.id}>
            <ProductSearchItem product={product} />
          </li>
        ))}
      </ol>
    </div>
  )
}
