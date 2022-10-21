import Image from 'next/image'
import { useState } from 'react'
import { Button, IconMinus, IconPlus } from 'src/components'
import { formatyMoney } from 'src/utils'
import styles from './ProductCartItem.module.scss'
import { Product } from 'src/graphql'

export type TProductCartItemProps = {
  product?: Product
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
        {
          /* istanbul ignore next */
          product.cover && (
            <Image
              layout="responsive"
              src={product.cover.url}
              alt={product.name}
              width={product.cover.width || undefined}
              height={product.cover.height || undefined}
            />
          )
        }
      </figure>
      <div className={styles.content}>
        <header className={styles.header}>
          <h2 className={styles.title}>{product.name}</h2>
          <p className={styles.price}>{formatyMoney(product.price)}</p>
        </header>

        <div className={styles.actions}>
          <Button variant="secondary" rounded onClick={decrease}>
            <IconMinus title="Decrease" />
          </Button>
          <span
            data-testid="count"
            className={styles.count}
            title={`Buying ${count} ${product.name}`}
          >
            {count}
          </span>
          <Button variant="secondary" rounded onClick={increase}>
            <IconPlus title="Increase" />
          </Button>
        </div>
      </div>
    </section>
  ) : null
}
