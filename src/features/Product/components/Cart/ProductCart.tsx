import { ProductCartList, useCart } from 'src/features/Product'
import { Button, Dialog } from 'src/components'

export const ProductCart: React.FC = () => {
  const { cartProducts, cartIsOpen, setCartIsOpen } = useCart()

  const subtitle = () => {
    if (cartProducts.length === 0) return 'Your cart is empty'
    if (cartProducts.length === 1) return 'With 1 product'
    return `With ${cartProducts.length} products`
  }

  return (
    <Dialog
      open={cartIsOpen}
      title="My cart"
      subtitle={subtitle()}
      onClose={() => setCartIsOpen(false)}
      footer={
        cartProducts.length > 0 && <Button fullWidth>Go to checkout</Button>
      }
    >
      {<ProductCartList products={cartProducts} />}
    </Dialog>
  )
}
