import { Container } from 'src/components/layout/shared/Container/Container'
import { ProductSearchItem } from '../Item/ProductSearchItem'
import { TProduct } from 'src/features/Product/types'
import styles from './ProductSearchList.module.scss'

type TProductSearchListProps = {
  products: Array<TProduct>
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
