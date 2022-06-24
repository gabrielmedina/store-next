import Image from 'next/image'
import { useState } from 'react'
import { Button, IconAdd, IconRemove } from 'src/components'
import { TProduct } from 'src/features'
import { formatyMoney } from 'src/utils'
import styles from './ProductCartItem.module.scss'

export type TProductCartItemProps = {
  product?: TProduct
}

export const ProductCartItem: React.FC<TProductCartItemProps> = ({
  product,
}) => {
  const [count, setCount] = useState(1)

  const increase = () => {
    setCount(count + 1)
  }

  const decrease = () => {
    if (count !== 1) setCount(count - 1)
  }

  return product ? (
    <section data-testid="item" className={styles.container}>
      <figure className={styles.figure}>
        {product.cover && (
          <Image
            layout="responsive"
            src={product.cover.url}
            alt={product.name}
            width={product.cover.width}
            height={product.cover.height}
          />
        )}
      </figure>
      <div className={styles.content}>
        <h2 className={styles.title}>{product.name}</h2>
        <p className={styles.price}>{formatyMoney(product.price)}</p>

        <div className={styles.actions}>
          <Button
            variant="secondary"
            rounded
            className={styles.buttonClose}
            onClick={decrease}
          >
            <IconRemove />
          </Button>
          <span data-testid="count" className={styles.count}>
            {count}
          </span>
          <Button
            variant="secondary"
            rounded
            className={styles.buttonClose}
            onClick={increase}
          >
            <IconAdd />
          </Button>
        </div>
      </div>
    </section>
  ) : null
}
