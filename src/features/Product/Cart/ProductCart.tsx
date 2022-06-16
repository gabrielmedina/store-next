import { useRecoilState, useRecoilValue } from 'recoil'
import { ProductCartList, StateCartOpen, StateCartItems } from 'src/features'
import { Button, Dialog } from 'src/components'

export const ProductCart: React.FC = () => {
  const cartItems = useRecoilValue(StateCartItems)
  const [cartOpen, setCartOpen] = useRecoilState(StateCartOpen)

  return (
    <Dialog
      open={cartOpen}
      title="My cart"
      subtitle="With 3 products"
      onClose={() => setCartOpen(false)}
      footer={
        <Button fullWidth onClick={() => alert('Go to checkout')}>
          Go to checkout
        </Button>
      }
    >
      {<ProductCartList products={cartItems} />}
    </Dialog>
  )
}
