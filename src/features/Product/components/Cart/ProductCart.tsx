import { useRecoilState, useRecoilValue } from 'recoil'
import {
  ProductCartList,
  StateCartOpen,
  StateCartItems,
} from 'src/features/Product'
import { Button, Dialog } from 'src/components'

export const ProductCart: React.FC = () => {
  const cartItems = useRecoilValue(StateCartItems)
  const [cartOpen, setCartOpen] = useRecoilState(StateCartOpen)

  const subtitle = () => {
    if (cartItems.length === 0) return 'Your cart is empty'
    if (cartItems.length === 1) return 'With 1 product'
    return `With ${cartItems.length} products`
  }

  return (
    <Dialog
      open={cartOpen}
      title="My cart"
      subtitle={subtitle()}
      onClose={() => setCartOpen(false)}
      footer={cartItems.length > 0 && <Button fullWidth>Go to checkout</Button>}
    >
      {<ProductCartList products={cartItems} />}
    </Dialog>
  )
}
