import { render, screen } from '@testing-library/react'
import ProductPage, { TProductPageProps } from './[slug].page'
import { StateCartItems } from 'src/features'
import { RecoilMock } from 'test/_mocks/RecoilMock'
import ProductsStub from 'test/_stubs/ProductsStub.json'

const product = ProductsStub[0]

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: `/product/${product.slug}`,
    }
  },
}))

const onRecoilChange = jest.fn()

const makeSut = (props: TProductPageProps) => {
  return render(
    <RecoilMock node={StateCartItems} onChange={onRecoilChange}>
      <ProductPage {...props} />
    </RecoilMock>
  )
}

describe('ProductPage', () => {
  it('should render correctly', () => {
    // @ts-ignore
    makeSut({ loading: false, product })

    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument()
    expect(screen.getByTestId('product-detail')).toBeInTheDocument()
  })

  it('should render Breadcrumb correctly', () => {
    // @ts-ignore
    makeSut({ loading: false, product })

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: product.name })).toBeInTheDocument()
  })

  it('should no render ProductDetail when loading is true', () => {
    // @ts-ignore
    makeSut({ loading: true, product })

    expect(screen.queryByTestId('product-detail')).not.toBeInTheDocument()
  })
})
