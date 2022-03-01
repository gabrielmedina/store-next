export const Header: React.FC = () => {
  return (
    <header>
      <h1>Store</h1>

      <form>
        <label htmlFor="search">Search</label>
        <input type="search" name="search" id="search" />
      </form>

      <button>Cart</button>
    </header>
  )
}
