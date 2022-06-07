import Link from 'next/link'
import { ProductSearchForm } from 'src/features'
import { Logo, Button, IconCart } from 'src/components'
import styles from './Header.module.scss'

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
      </h1>

      <ProductSearchForm className={styles.search} />

      <div className={styles.nav}>
        <Button onClick={() => alert('cart')}>
          <IconCart />
        </Button>
      </div>
    </header>
  )
}
