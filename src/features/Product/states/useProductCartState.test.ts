import { RecoilRoot } from 'recoil'
import { act, renderHook } from '@testing-library/react'
import { useProductCartState } from './useProductCartState'
import ProductsStub from 'test/_stubs/ProductsStub.json'

const makeSut = () =>
  renderHook(() => useProductCartState(), {
    wrapper: RecoilRoot,
  })

describe('useProductCartState()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return correctly', () => {
    const { result } = makeSut()

    expect(result.current).toEqual({
      products: [],
      addProduct: expect.any(Function),
      isVisible: false,
      setIsVisible: expect.any(Function),
    })
  })

  it('should open product cart', () => {
    const { result } = makeSut()

    act(() => result.current.setIsVisible(true))

    expect(result.current.isVisible).toBe(true)
  })

  it('should add product to cart', () => {
    const { result } = makeSut()

    const product = ProductsStub[0]

    // @ts-ignore
    act(() => result.current.addProduct(product))

    expect(result.current.products).toHaveLength(1)
    expect(result.current.isVisible).toBe(true)
  })

  it("should don't add same product to cart", () => {
    const { result } = makeSut()

    const product = ProductsStub[0]

    // @ts-ignore
    act(() => result.current.addProduct(product))
    expect(result.current.products).toHaveLength(1)

    // @ts-ignore
    act(() => result.current.addProduct(product))
    expect(result.current.products).toHaveLength(1)
  })
})
