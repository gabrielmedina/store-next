import { act, renderHook } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import { useCart } from './useCart'
import ProductsStub from 'test/_stubs/ProductsStub.json'

const makeSut = () => {
  return renderHook(() => useCart(), {
    wrapper: RecoilRoot,
  })
}

describe('useCart', () => {
  it('should initialize correctly', () => {
    const { result } = makeSut()

    expect(result.current.cartProducts).toEqual([])
    expect(result.current.cartIsOpen).toEqual(false)
  })

  it('should open cart', () => {
    const { result } = makeSut()

    act(() => {
      result.current.setCartIsOpen(true)
    })

    expect(result.current.cartIsOpen).toEqual(true)
  })

  it('should add product and open cart', () => {
    const product = ProductsStub[0]

    const { result } = makeSut()

    act(() => {
      // @ts-ignore
      result.current.addProduct(product)
    })

    expect(result.current.cartProducts).toEqual([product])
    expect(result.current.cartIsOpen).toEqual(true)
  })

  it("should don't add same product", () => {
    const product = ProductsStub[0]

    const { result } = makeSut()

    act(() => {
      // @ts-ignore
      result.current.addProduct(product)
    })

    act(() => {
      // @ts-ignore
      result.current.addProduct(product)
    })

    expect(result.current.cartProducts).toEqual([product])
  })
})
