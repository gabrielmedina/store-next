export const ProductsListingItem: React.FC = () => {
  return (
    <a href="#">
      <section>
        <header>
          <h2>Product Name</h2>
          <p>R$ 1.000,00</p>
        </header>

        <figure>
          <img src="/products/product.jpg" alt="Product" />
        </figure>
      </section>
    </a>
  )
}
