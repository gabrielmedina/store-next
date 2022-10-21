import { useCart } from 'src/features/Product/hooks/useCart'

jest.mock('src/features/Product/hooks/useCart')

const useCartMock = useCart as jest.Mock

const useCartMockReturn = {
  addProduct: jest.fn(),
  cartProducts: [],
  setCartIsOpen: jest.fn(),
  cartIsOpen: false,
}

export { useCartMock, useCartMockReturn }
