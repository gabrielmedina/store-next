import { useRecoilState } from 'recoil'
import { StateCartProducts, StateCartOpen } from 'src/features/Product'
import { Product } from 'src/graphql'

export const useCart = () => {
  const [cartProducts, setCartProducts] = useRecoilState(StateCartProducts)
  const [cartIsOpen, setCartIsOpen] = useRecoilState(StateCartOpen)

  const addProduct = (product: Product) => {
    const hasProduct = cartProducts.find(({ id }) => id === product.id)

    if (!hasProduct) {
      setCartProducts([...cartProducts, product])
    }

    setCartIsOpen(true)
  }

  return {
    addProduct,
    cartProducts,
    cartIsOpen,
    setCartIsOpen,
  }
}
