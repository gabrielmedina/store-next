import Image from 'next/image'
import { Button } from 'src/components'
import { formatyMoney } from 'src/utils'
import { useCart } from 'src/features/Product/hooks'
import { Product } from 'src/graphql'
import styles from './ProductDetail.module.scss'

export type TProductDetailProps = {
  product: Product
}

export const ProductDetail: React.FC<TProductDetailProps> = ({ product }) => {
  const { cartAddProduct } = useCart()

  if (!product) return null

  return (
    <article data-testid="product-detail" className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.description}>{product.description}</p>
        </header>

        <p className={styles.price}>{formatyMoney(product.price)}</p>

        <Button fullWidth onClick={() => cartAddProduct(product)}>
          Add to cart
        </Button>
      </div>

      <div className={styles.slider}>
        {product.images?.map((image) => {
          /* istanbul ignore next */
          return (
            <figure className={styles.figure} key={image.id}>
              <Image fill src={image.url} alt={product.name} />
            </figure>
          )
        })}
      </div>
    </article>
  )
}
