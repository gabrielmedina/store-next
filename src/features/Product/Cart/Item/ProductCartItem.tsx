import Image from 'next/image'
import { Button, IconAdd, IconRemove } from 'src/components'
import { TProduct } from 'src/features'
import { formatyMoney } from 'src/lib'
import styles from './ProductCartItem.module.scss'

type TProductCartItemProps = {
  product?: TProduct
}

export const ProductCartItem: React.FC<TProductCartItemProps> = ({
  product,
}) => {
  return product ? (
    <section className={styles.container}>
      <figure className={styles.figure}>
        {product.image && (
          <Image
            layout="responsive"
            src={product.image.src}
            alt={product.image.alt}
            width={500}
            height={500}
          />
        )}
      </figure>
      <div className={styles.content}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.price}>{formatyMoney(product.price)}</p>

        <div className={styles.actions}>
          <Button variant="secondary" rounded className={styles.buttonClose}>
            <IconRemove />
          </Button>
          <span className={styles.count}>1</span>
          <Button variant="secondary" rounded className={styles.buttonClose}>
            <IconAdd />
          </Button>
        </div>
      </div>
    </section>
  ) : null
}
