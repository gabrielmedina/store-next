import { useRecoilState, useSetRecoilState } from 'recoil'
import { TProduct, StateCartItems, StateCartOpen } from 'src/features'
import { Button, Card, IconCart } from 'src/components'
import { formatyMoney } from 'src/lib'

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
        title={product.title}
        description={formatyMoney(product.price)}
        image={product.image}
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
