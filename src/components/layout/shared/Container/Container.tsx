import classNames from 'classnames'
import styles from './Container.module.scss'

type TContainerProps = {
  size?: 'small' | 'medium'
}

export const Container: React.FC<TContainerProps> = ({
  children,
  size = 'medium',
}) => {
  return (
    <div className={classNames(styles.container, styles[size])}>{children}</div>
  )
}
