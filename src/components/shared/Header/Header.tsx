import { ProductSearchForm } from '@features'

import styles from './Header.module.scss'

export const Header: React.FC = () => {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>Store</h1>

      <ProductSearchForm />

      <button>Cart</button>
    </header>
  )
}
