import Link from 'next/link'
import { Logo, Button, IconCart } from 'src/components'
import { ProductSearchForm } from 'src/features/Product/components'
import { useCart } from 'src/features/Product/hooks'
import styles from './Header.module.scss'

export const Header: React.FC = () => {
  const { cartSetIsOpen } = useCart()

  return (
    <header data-testid="header" className={styles.header}>
      <h1 className={styles.logo}>
        <Link href="/">
          <Logo />
        </Link>
      </h1>

      <ProductSearchForm className={styles.search} />

      <nav className={styles.nav}>
        <Button variant="secondary" rounded onClick={() => cartSetIsOpen(true)}>
          <IconCart title="Open cart" />
        </Button>
      </nav>
    </header>
  )
}
