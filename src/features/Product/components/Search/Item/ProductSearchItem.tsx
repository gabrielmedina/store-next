import Link from 'next/link'
import { useCart } from 'src/features/Product'
import { Button, Card, IconCart } from 'src/components'
import { formatyMoney } from 'src/utils'
import { Product } from 'src/graphql'

export type TProductSearchItemProps = {
  product: Product
}

export const ProductSearchItem: React.FC<TProductSearchItemProps> = ({
  product,
}) => {
  const { addProduct } = useCart()

  /* istanbul ignore next */
  return (
    <Link href={`/product/${product.slug}`}>
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
              addProduct(product)
            }}
          >
            <IconCart title={`Add ${product.name} to cart`} />
          </Button>
        }
      />
    </Link>
  )
}
