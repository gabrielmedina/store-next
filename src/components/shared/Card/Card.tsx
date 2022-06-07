import Image from 'next/image'
import { ReactChild } from 'react'
import styles from './Card.module.scss'

type TCardProps = {
  title: string
  description?: string
  cta?: ReactChild
  image?: {
    src: string
    alt: string
  }
}

export const Card: React.FC<TCardProps> = ({
  title,
  description,
  image,
  cta,
}) => {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.descrption}>{description}</p>}
        {cta && <div className={styles.cta}>{cta}</div>}
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
