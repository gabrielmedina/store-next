import { useRecoilState } from 'recoil'
import { StateCartProducts, StateCartOpen } from 'src/features/Product/states'
import { Product } from 'src/graphql'

export const useCart = () => {
  const [cartProducts, setCartProducts] =
    useRecoilState<Product[]>(StateCartProducts)
  const [cartIsOpen, setCartIsOpen] = useRecoilState<boolean>(StateCartOpen)

  const cartAddProduct = (product: Product) => {
    const hasProduct = cartProducts.find(({ id }) => id === product.id)

    if (!hasProduct) {
      setCartProducts([...cartProducts, product])
    }

    setCartIsOpen(true)
  }

  return {
    cartProducts,
    cartProductsQuantity: cartProducts.length,
    cartIsOpen,
    cartSetIsOpen: setCartIsOpen,
    cartAddProduct,
  }
}
