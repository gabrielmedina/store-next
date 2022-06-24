import { useRecoilState, useSetRecoilState } from 'recoil'
import { TProduct, StateCartItems, StateCartOpen } from 'src/features'
import { Button, Card, IconCart } from 'src/components'
import { formatyMoney } from 'src/utils'

export type TProductSearchItemProps = {
  product: TProduct
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
          width: product.cover.width,
          height: product.cover.height,
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
