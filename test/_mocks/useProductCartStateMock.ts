import { useProductCartState } from 'src/features/Product/states'

jest.mock('src/features/Product/states/useProductCartState')

const useProductCartStateMock = useProductCartState as jest.Mock

const useProductCartStateMockReturn = {
  products: [],
  addProduct: jest.fn(),
  isVisible: false,
  setIsVisible: jest.fn(),
}

export { useProductCartStateMock, useProductCartStateMockReturn }
