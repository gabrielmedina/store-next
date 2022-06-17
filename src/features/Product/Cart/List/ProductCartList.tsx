import { TProduct } from 'src/features/Product/types'
import { ProductCartItem } from '../Item/ProductCartItem'
import styles from './ProductCartList.module.scss'

export type TProductCartListProps = {
  products?: Array<TProduct>
}

export const ProductCartList: React.FC<TProductCartListProps> = ({
  products,
}) => {
  if (!products?.length) return null

  return (
    <ol className={styles.list}>
      {products?.map((product) => (
        <li className={styles.item} key={product.id}>
          <ProductCartItem product={product} />
        </li>
      ))}
    </ol>
  )
}
