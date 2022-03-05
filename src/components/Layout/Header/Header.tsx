import { ProductSearchForm } from '@features'

export const Header: React.FC = () => {
  return (
    <header>
      <h1>Store</h1>

      <ProductSearchForm />

      <button>Cart</button>
    </header>
  )
}
