import Link from 'next/link'
import { useSetRecoilState } from 'recoil'
import { StateCartOpen, ProductSearchForm } from 'src/features'
import { Logo, Button, IconCart } from 'src/components'
import styles from './Header.module.scss'

export const Header: React.FC = () => {
  const setCartOpen = useSetRecoilState(StateCartOpen)

  return (
    <header data-testid="header" className={styles.header}>
      <h1 className={styles.logo}>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
      </h1>

      <ProductSearchForm className={styles.search} />

      <nav className={styles.nav}>
        <Button variant="secondary" rounded onClick={() => setCartOpen(true)}>
          <IconCart />
        </Button>
      </nav>
    </header>
  )
}
