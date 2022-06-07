import { Button } from 'src/components'
import { TProduct } from 'src/features/Product/types'
import styles from './ProductCart.module.scss'

type TProductCartProps = {
  products?: Array<TProduct>
}

export const ProductCart: React.FC<TProductCartProps> = ({ products }) => {
  return (
    <section className={styles.cart}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h2 className={styles.title}>My cart</h2>
          <p className={styles.description}>With 3 products</p>
        </header>
        {products && (
          <ol className={styles.list}>
            {products.map((product) => (
              <li key={product.id}>{product.title}</li>
            ))}
          </ol>
        )}
        <footer className={styles.footer}>
          <Button variant="primary" fullWidth>
            Go to checkout
          </Button>
        </footer>
      </div>
    </section>
  )
}
