import Link from 'next/link'
import { ProductSearchForm, useCart } from 'src/features/Product'
import { Logo, Button, IconCart } from 'src/components'
import styles from './Header.module.scss'

export const Header: React.FC = () => {
  const { setCartIsOpen } = useCart()

  return (
    <header data-testid="header" className={styles.header}>
      <h1 className={styles.logo}>
        <Link href="/">
          <Logo />
        </Link>
      </h1>

      <ProductSearchForm className={styles.search} />

      <nav className={styles.nav}>
        <Button variant="secondary" rounded onClick={() => setCartIsOpen(true)}>
          <IconCart title="Open cart" />
        </Button>
      </nav>
    </header>
  )
}
