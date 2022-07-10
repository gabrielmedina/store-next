import classNames from 'classnames'
import styles from './Container.module.scss'

type TContainerProps = {
  size?: 'small' | 'medium'
}

export const Container: React.FC<TContainerProps> = ({
  children,
  size = 'medium',
}) => {
  const sizeMap = {
    small: {
      className: styles.containerSizeSmall,
    },
    medium: {
      className: styles.containerSizeMedium,
    },
  }

  return (
    <div className={classNames(styles.container, sizeMap[size].className)}>
      {children}
    </div>
  )
}
