import classNames from 'classnames'
import styles from './Container.module.scss'

export type TContainerProps = {
  size?: 'small' | 'medium'
}

export const Container: React.FC<TContainerProps> = ({
  children,
  size = 'medium',
}) => {
  const sizeMap = {
    small: {
      className: styles.sizeSmall,
    },
    medium: {
      className: styles.sizeMedium,
    },
  }

  return (
    <div
      data-testid="container"
      className={classNames(styles.container, sizeMap[size].className)}
    >
      {children}
    </div>
  )
}
