import { useCart } from 'src/features/Product/hooks/useCart'

jest.mock('src/features/Product/hooks/useCart')

const useCartMock = useCart as jest.Mock

const useCartMockReturn = {
  cartProducts: [],
  cartProductsQuantity: 0,
  cartIsOpen: false,
  cartSetIsOpen: jest.fn(),
  cartAddProduct: jest.fn(),
}

export { useCartMock, useCartMockReturn }
