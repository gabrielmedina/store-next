import classNames from 'classnames'
import Image, { ImageProps } from 'next/image'
import styles from './EmptyState.module.scss'

export type TEmptyStateProps = {
  title: string
  text?: string
  image?: ImageProps
  className?: string
}

export const EmptyState: React.FC<TEmptyStateProps> = ({
  title,
  text,
  image,
  className,
}) => {
  return (
    <div className={classNames(styles.container, className)}>
      <h2 className={styles.title}>{title}</h2>
      {text && <p className={styles.text}>{text}</p>}
      {image && (
        <figure className={styles.figure}>
          <div className={styles.image}>
            <Image {...image} />
          </div>
        </figure>
      )}
    </div>
  )
}
