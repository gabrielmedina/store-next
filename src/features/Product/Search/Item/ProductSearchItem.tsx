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
    setCartItems([...cartItems, product])
    setCartOpen(true)
  }

  return (
    <a href="#">
      <Card
        title={product.name}
        description={formatyMoney(product.price)}
        image={{
          alt: product.name,
          src: product.cover.url,
          width: product.cover.width || undefined,
          height: product.cover.height || undefined,
        }}
        cta={
          <Button
            rounded
            onClick={(event) => {
              event.preventDefault()
              addProductToCart()
            }}
          >
            <IconCart />
          </Button>
        }
      />
    </a>
  )
}
