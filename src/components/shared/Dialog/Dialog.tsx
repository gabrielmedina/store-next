import { ReactChild } from 'react'
import classNames from 'classnames'
import styles from './Dialog.module.scss'
import { Button, IconClose } from 'src/components'

export type TDialogProps = {
  open: boolean
  title: string
  subtitle?: string
  footer?: ReactChild | boolean
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
      className={classNames(styles.dialog, {
        [styles.open]: open,
      })}
    >
      <div role="dialog" className={styles.backdrop}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </header>

          <div className={styles.content}>{children}</div>

          {footer && <footer className={styles.footer}>{footer}</footer>}

          <Button
            variant="secondary"
            rounded
            className={styles.buttonClose}
            onClick={onClose}
          >
            <IconClose />
          </Button>
        </div>
      </div>
    </section>
  )
}
