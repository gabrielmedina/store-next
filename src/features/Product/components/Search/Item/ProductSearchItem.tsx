import Link from 'next/link'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { StateCartItems, StateCartOpen } from 'src/features'
import { Button, Card, IconCart } from 'src/components'
import { formatyMoney } from 'src/utils'
import { Product } from 'src/graphql'

export type TProductSearchItemProps = {
  product: Product
}

export const ProductSearchItem: React.FC<TProductSearchItemProps> = ({
  product,
}) => {
  const [cartItems, setCartItems] = useRecoilState(StateCartItems)
  const setCartOpen = useSetRecoilState(StateCartOpen)

  const addProductToCart = () => {
    const hasProduct = cartItems.find(({ id }) => id === product.id)

    if (!hasProduct) {
      setCartItems([...cartItems, product])
    }

    setCartOpen(true)
  }

  /* istanbul ignore next */
  return (
    <Link href={`/product/${product.slug}`}>
      <a>
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
                addProductToCart()
              }}
            >
              <IconCart title={`Add ${product.name} to cart`} />
            </Button>
          }
        />
      </a>
    </Link>
  )
}
