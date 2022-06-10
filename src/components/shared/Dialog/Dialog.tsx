import { ReactChild } from 'react'
import classNames from 'classnames'
import styles from './Dialog.module.scss'

type TDialogProps = {
  open: boolean
  title: string
  subtitle?: string
  footer?: ReactChild
  onClose: () => void
}

export const Dialog: React.FC<TDialogProps> = ({
  open,
  title,
  subtitle,
  footer,
  onClose,
  children,
}) => {
  return (
    <section
      role="dialog"
      className={classNames(styles.dialog, {
        [styles.open]: open,
      })}
    >
      <div className={styles.backdrop}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            <button onClick={() => onClose()}>Fechar</button>
          </header>

          <div className={styles.content}>{children}</div>

          {footer && <footer className={styles.footer}>{footer}</footer>}
        </div>
      </div>
    </section>
  )
}
