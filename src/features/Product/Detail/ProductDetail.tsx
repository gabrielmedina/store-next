import { FC } from 'react'
import Image from 'next/image'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { StateCartItems, StateCartOpen } from 'src/features'
import { Button, Container } from 'src/components'
import { formatyMoney } from 'src/utils'
import { Product } from 'src/graphql'
import styles from './ProductDetail.module.scss'

export type TProductDetailProps = {
  product: Product
}

export const ProductDetail: FC<TProductDetailProps> = ({ product }) => {
  const [cartItems, setCartItems] = useRecoilState(StateCartItems)
  const setCartOpen = useSetRecoilState(StateCartOpen)

  const addProductToCart = () => {
    setCartItems([...cartItems, product])
    setCartOpen(true)
  }

  if (!product) return null

  return (
    <Container size="small">
      <article data-testid="product-detail" className={styles.container}>
        <div className={styles.content}>
          <header className={styles.header}>
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.description}>{product.description}</p>
          </header>

          <p className={styles.price}>{formatyMoney(product.price)}</p>

          <Button
            fullWidth
            onClick={() => {
              addProductToCart()
            }}
          >
            Add to cart
          </Button>
        </div>

        <div className={styles.slider}>
          {product.images?.map((image) => {
            /* istanbul ignore next */
            return (
              <figure className={styles.figure} key={image.id}>
                <Image
                  layout="responsive"
                  src={image.url}
                  alt={product.name}
                  width={image.width || undefined}
                  height={image.height || undefined}
                />
              </figure>
            )
          })}
        </div>
      </article>
    </Container>
  )
}
