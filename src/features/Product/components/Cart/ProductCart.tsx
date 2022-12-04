import { Button, Dialog } from 'src/components'
import { useCart } from 'src/features/Product/hooks'
import { ProductCartList } from './List/ProductCartList'

export const ProductCart: React.FC = () => {
  const { cartProducts, cartIsOpen, cartSetIsOpen } = useCart()

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
      onClose={() => cartSetIsOpen(false)}
      footer={
        cartProducts.length > 0 && <Button fullWidth>Go to checkout</Button>
      }
    >
      {<ProductCartList products={cartProducts} />}
    </Dialog>
  )
}
