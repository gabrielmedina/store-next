import { useRecoilState, useRecoilValue } from 'recoil'
import { ProductCartList, StateCartOpen, StateCartItems } from 'src/features'
import { Dialog } from 'src/components'

export const ProductCart: React.FC = () => {
  const cartItems = useRecoilValue(StateCartItems)
  const [cartOpen, setCartOpen] = useRecoilState(StateCartOpen)

  return (
    <Dialog open={cartOpen} title="My cart" onClose={() => setCartOpen(false)}>
      {<ProductCartList products={cartItems} />}
    </Dialog>
  )
}
