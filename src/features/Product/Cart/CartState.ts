import { atom } from 'recoil'
import { TProduct } from '../types'

const STATE_CART_ITEMS_INIT: Array<TProduct> = []

export const StateCartItems = atom({
  key: 'stateCartItems',
  default: STATE_CART_ITEMS_INIT
})

export const StateCartOpen = atom({
  key: 'stateCardOpen',
  default: false
})


