import { TProduct } from 'src/features/Product/types'
import { ProductCartItem } from '../Item/ProductCartItem'
import styles from './ProductCartList.module.scss'

type TProductCartListProps = {
  products?: Array<TProduct>
}

export const ProductCartList: React.FC<TProductCartListProps> = ({
  products,
}) => {
  return (
    <ol className={styles.list}>
      {products &&
        products.map((product) => (
          <li className={styles.item} key={product.id}>
            <ProductCartItem product={product} />
          </li>
        ))}
    </ol>
  )
}
