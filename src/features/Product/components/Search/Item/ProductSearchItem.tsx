import Link from 'next/link'
import { formatyMoney } from 'src/utils'
import { Button, Card, IconCart } from 'src/components'
import { useProductCartState } from 'src/features/Product/states'
import { Product } from 'src/graphql'
import styles from './ProductSearchItem.module.scss'

export type TProductSearchItemProps = {
  product: Product
}

export const ProductSearchItem: React.FC<TProductSearchItemProps> = ({
  product,
}) => {
  const { addProduct } = useProductCartState()

  /* istanbul ignore next */
  return (
    <Link
      href={`/products/${product.category?.slug}/${product.slug}`}
      className={styles.link}
    >
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
          <div className={styles.button}>
            <Button
              element="button"
              rounded
              onClick={(event) => {
                event.preventDefault()
                addProduct(product)
              }}
            >
              <IconCart title={`Add ${product.name} to cart`} />
            </Button>
          </div>
        }
      />
    </Link>
  )
}
