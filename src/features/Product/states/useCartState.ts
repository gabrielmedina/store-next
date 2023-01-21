import { atom, useRecoilState } from 'recoil'
import { Product } from 'src/graphql'

const STATE_CART_PRODUCTS_INIT: Array<Product> = []

const StateCartProducts = atom({
  key: 'stateCartProducts',
  default: STATE_CART_PRODUCTS_INIT,
})

const StateCartOpen = atom({
  key: 'stateCardOpen',
  default: false,
})

export const useCartState = () => {
  const [products, setProducts] = useRecoilState<Product[]>(StateCartProducts)
  const [isVisible, setIsVisible] = useRecoilState<boolean>(StateCartOpen)

  const addProduct = (product: Product) => {
    const hasProduct = products.find(({ id }) => id === product.id)

    if (!hasProduct) {
      setProducts([...products, product])
    }

    setIsVisible(true)
  }

  return {
    products,
    addProduct,
    isVisible,
    setIsVisible,
  }
}
