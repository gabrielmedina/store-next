import { SearchForm } from '@features'

export const Header: React.FC = () => {
  return (
    <header>
      <h1>Store</h1>

      <SearchForm />

      <button>Cart</button>
    </header>
  )
}
