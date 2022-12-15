import Link from 'next/link'
import { formatyMoney } from 'src/utils'
import { Button, Card, IconCart } from 'src/components'
import { useCart } from 'src/features/Product/hooks'
import { Product } from 'src/graphql'
import styles from './ProductSearchItem.module.scss'

export type TProductSearchItemProps = {
  product: Product
}

export const ProductSearchItem: React.FC<TProductSearchItemProps> = ({
  product,
}) => {
  const { cartAddProduct } = useCart()

  /* istanbul ignore next */
  return (
    <Link href={`/product/${product.slug}`} className={styles.link}>
      <Card
        title={product.name}
        description={formatyMoney(product.price)}
        image={{
          alt: product.name,
          src: product.cover?.url,
          width: product.cover?.width || undefined,
          height: product.cover?.height || undefined,
        }}
        cta={
          <Button
            element="button"
            rounded
            onClick={(event) => {
              event.preventDefault()
              cartAddProduct(product)
            }}
            className={styles.button}
          >
            <IconCart title={`Add ${product.name} to cart`} />
          </Button>
        }
      />
    </Link>
  )
}
