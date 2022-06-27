import { atom } from 'recoil'
import { Product } from 'src/graphql'

const STATE_CART_ITEMS_INIT: Array<Product> = []

export const StateCartItems = atom({
  key: 'stateCartItems',
  default: STATE_CART_ITEMS_INIT
})

export const StateCartOpen = atom({
  key: 'stateCardOpen',
  default: false
})


