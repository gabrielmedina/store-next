// @ts-nocheck
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ProductSearchItem, TProductSearchItemProps } from './ProductSearchItem'
import { StateCartItems } from 'src/features/Product/Cart/CartState'
import { RecoilMock } from 'test/_mocks/RecoilMock'
import ProductsStub from 'test/_stubs/ProductsStub.json'
import { formatyMoney } from 'src/utils'

const onRecoilChange = jest.fn()

const makeSut = ({ product }: TProductSearchItemProps) => {
  return render(
    <RecoilMock node={StateCartItems} onChange={onRecoilChange}>
      <ProductSearchItem product={product} />
    </RecoilMock>
  )
}

describe('ProductSearchItem', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    const product = ProductsStub[0]
    makeSut({ product })

    expect(screen.getByText(product.name)).toBeInTheDocument()
    expect(screen.getByText(formatyMoney(product.price))).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src')
  })

  it('should add product to cart when button has clicked', async () => {
    const product = ProductsStub[0]
    makeSut({ product })

    fireEvent.click(screen.getByTitle('Cart'))

    await waitFor(() => {
      expect(onRecoilChange).toBeCalled()
      expect(onRecoilChange).toHaveBeenNthCalledWith(2, [product])
    })
  })
})
