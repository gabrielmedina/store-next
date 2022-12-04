import { atom } from 'recoil'
import { Product } from 'src/graphql'

const STATE_CART_PRODUCTS_INIT: Array<Product> = []

export const StateCartProducts = atom({
  key: 'stateCartProducts',
  default: STATE_CART_PRODUCTS_INIT,
})

export const StateCartOpen = atom({
  key: 'stateCardOpen',
  default: false,
})
