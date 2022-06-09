import { TProduct } from 'src/features/Product/types'
import styles from './ProductCartItem.module.scss'

type TProductCartItemProps = {
  product?: TProduct
}

export const ProductCartItem: React.FC<TProductCartItemProps> = ({
  product,
}) => {
  return product ? <h2 className={styles.title}>{product.title}</h2> : null
}
