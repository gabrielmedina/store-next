// @ts-nocheck
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ProductCart } from './ProductCart'
import { StateCartItems, StateCartOpen } from './CartState'
import { RecoilMock, TRecoilMockProps } from 'test/_mocks/RecoilMock'
import ProductsStub from 'test/_stubs/ProductsStub.json'

const onRecoilChange = jest.fn()

const makeSut = ({ node, values }: TRecoilMockProps) => {
  return render(
    <RecoilMock node={node} values={values} onChange={onRecoilChange}>
      <ProductCart />
    </RecoilMock>
  )
}

describe('ProductCart', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    makeSut({ values: [], node: StateCartItems })

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
    expect(screen.queryByText('Go to checkout')).toBeFalsy()
  })

  it('should display products quantity when has one product on cart', () => {
    const products = [ProductsStub[0]]
    makeSut({ values: products, node: StateCartItems })

    expect(screen.getByText('With 1 product')).toBeInTheDocument()
  })

  it('should display products quantity when has products on cart', () => {
    const products = ProductsStub
    makeSut({ values: products, node: StateCartItems })

    expect(
      screen.getByText(`With ${products.length} products`)
    ).toBeInTheDocument()
  })

  it('should display Go to checkout when has products on cart', () => {
    const products = ProductsStub
    makeSut({ values: products, node: StateCartItems })

    expect(screen.queryByText('Go to checkout')).toBeTruthy()
  })

  it('should hide Dialog when close button has clicked', async () => {
    makeSut({ values: true, node: StateCartOpen })

    const close = screen.getByTitle('Close')

    fireEvent.click(close)
    await waitFor(() => close)
    expect(onRecoilChange).toBeCalledWith(false)
  })
})
