import { useCartState } from 'src/features/Product/states'

jest.mock('src/features/Product/states/useCartState')

const useCartStateMock = useCartState as jest.Mock

const useCartStateMockReturn = {
  products: [],
  addProduct: jest.fn(),
  isVisible: false,
  setIsVisible: jest.fn(),
}

export { useCartStateMock, useCartStateMockReturn }
