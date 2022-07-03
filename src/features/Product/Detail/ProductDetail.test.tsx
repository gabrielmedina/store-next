import { fireEvent, render, screen } from '@testing-library/react'
import { ProductDetail, TProductDetailProps } from './ProductDetail'
import { StateCartOpen, StateCartItems } from 'src/features'
import { RecoilMock, TRecoilMockProps } from 'test/_mocks/RecoilMock'
import ProductsStub from 'test/_stubs/ProductsStub.json'
import { formatyMoney } from 'src/utils'

const onRecoilChange = jest.fn()

const makeSut = ({
  product,
  node,
  values,
}: TRecoilMockProps & TProductDetailProps) => {
  return render(
    <RecoilMock node={node} values={values} onChange={onRecoilChange}>
      <ProductDetail product={product} />
    </RecoilMock>
  )
}

describe('ProductDetail', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    const product = ProductsStub[0]
    // @ts-ignore
    makeSut({ product, values: false, node: StateCartOpen })

    expect(screen.queryByTestId('product-detail')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      product.name
    )
    expect(screen.getByText(product.description)).toBeInTheDocument()
    expect(screen.getByText(formatyMoney(product.price))).toBeInTheDocument()
    expect(screen.getByText('Add to cart')).toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('should no render when product is not provided', () => {
    // @ts-ignore
    makeSut({ product: null, values: false, node: StateCartOpen })

    expect(screen.queryByTestId('product-detail')).not.toBeInTheDocument()
  })

  it('should add product to cart when user click in Add to cart', () => {
    const product = ProductsStub[0]
    // @ts-ignore
    makeSut({ product, values: null, node: StateCartItems })

    fireEvent.click(screen.getByText('Add to cart'))

    expect(onRecoilChange).toHaveBeenNthCalledWith(2, [product])
  })

  it('should open the cart when user click in Add to cart', () => {
    const product = ProductsStub[0]
    // @ts-ignore
    makeSut({ product, values: false, node: StateCartOpen })

    fireEvent.click(screen.getByText('Add to cart'))

    expect(onRecoilChange).toHaveBeenNthCalledWith(2, true)
  })
})
