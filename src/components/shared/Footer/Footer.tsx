import { Logo } from 'src/components'
import styles from './Footer.module.scss'

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <h2 className={styles.logo}>
        <Logo />
      </h2>
      <small className={styles.copyright}>
        The best since 2021. 10001 - New York
      </small>
    </footer>
  )
}
