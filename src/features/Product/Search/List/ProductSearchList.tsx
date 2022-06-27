import { Container } from 'src/components/layout/shared/Container/Container'
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
    <Container>
      <ol className={styles.list}>
        {products.map((product) => (
          <li key={product.id}>
            <ProductSearchItem product={product} />
          </li>
        ))}
      </ol>
    </Container>
  )
}
