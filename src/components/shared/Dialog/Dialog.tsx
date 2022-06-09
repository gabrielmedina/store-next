import { ReactChild } from 'react'
import classNames from 'classnames'
import styles from './Dialog.module.scss'

type TDialogProps = {
  title: string
  subtitle?: string
  footer?: ReactChild
  isOpen: boolean
}

export const Dialog: React.FC<TDialogProps> = ({
  title,
  subtitle,
  footer,
  isOpen,
  children,
}) => {
  return (
    <div
      role="dialog"
      className={classNames(styles.dialog, {
        [styles.isOpen]: isOpen,
      })}
    >
      <div className={styles.backdrop}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </header>

          <div className={styles.content}>{children}</div>

          {footer && <footer className={styles.footer}>{footer}</footer>}
        </div>
      </div>
    </div>
  )
}
