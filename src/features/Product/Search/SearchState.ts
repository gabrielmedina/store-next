import { atom } from 'recoil'
import { Product } from 'src/graphql'

const STATE_SEARCH_ITEMS_INIT: Array<Product> = []

export const StateSearchItems = atom({
  key: 'stateSearchItems',
  default: STATE_SEARCH_ITEMS_INIT
})
