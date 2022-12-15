import classNames from 'classnames'
import styles from './Badge.module.scss'

export type TBadgeProps = {
  title?: string
  className?: string
}

export const Badge: React.FC<TBadgeProps> = ({
  title,
  className,
  children,
}) => {
  return (
    <span title={title} className={classNames(styles.container, className)}>
      {children}
    </span>
  )
}
