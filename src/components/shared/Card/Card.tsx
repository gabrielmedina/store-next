import Image from 'next/image'
import styles from './Card.module.scss'

type TCardProps = {
  title: string
  description?: string
  image?: {
    src: string
    alt: string
  }
}

export const Card: React.FC<TCardProps> = ({
  title,
  description,
  image,
  children,
}) => {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.descrption}>{description}</p>
        {children}
      </header>

      {image && (
        <figure className={styles.figure}>
          <Image
            layout="responsive"
            src={image.src}
            alt={image.alt}
            width={500}
            height={500}
          />
        </figure>
      )}
    </section>
  )
}
