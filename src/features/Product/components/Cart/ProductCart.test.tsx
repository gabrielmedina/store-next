import { fireEvent, render, screen, act, waitFor } from '@testing-library/react'
import { useCartMock, useCartMockReturn } from 'test/_mocks/useCartMock'
import { ProductCart } from './ProductCart'
import ProductsStub from 'test/_stubs/ProductsStub.json'

const makeSut = () => {
  return render(<ProductCart />)
}

describe('ProductCart', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    useCartMock.mockReturnValue(useCartMockReturn)

    makeSut()

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
    expect(screen.queryByText('Go to checkout')).toBeFalsy()
  })

  it('should display products quantity when has one product on cart', () => {
    const products = [ProductsStub[0]]

    useCartMock.mockReturnValue({
      ...useCartMockReturn,
      cartProducts: products,
      cartProductsQuantity: products.length,
    })

    makeSut()

    expect(screen.getByText('With 1 product')).toBeInTheDocument()
  })

  it('should display products quantity when has products on cart', async () => {
    const products = ProductsStub

    useCartMock.mockReturnValue({
      ...useCartMockReturn,
      cartProducts: products,
      cartProductsQuantity: products.length,
    })

    makeSut()

    await waitFor(() =>
      expect(
        screen.getByText(`With ${products.length} products`)
      ).toBeInTheDocument()
    )
  })

  it('should display Go to checkout when has products on cart', () => {
    const products = ProductsStub

    useCartMock.mockReturnValue({
      ...useCartMockReturn,
      cartProducts: products,
      cartProductsQuantity: products.length,
    })

    makeSut()

    expect(screen.queryByText('Go to checkout')).toBeTruthy()
  })

  it('should hide Dialog when close button has clicked', () => {
    useCartMock.mockReturnValue({
      ...useCartMockReturn,
      cartIsOpen: true,
    })

    makeSut()

    act(() => {
      const close = screen.getByTitle('Close')
      fireEvent.click(close)
    })

    expect(useCartMockReturn.cartSetIsOpen).toBeCalledWith(false)
  })
})
