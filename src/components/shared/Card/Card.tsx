import Image from 'next/image'
import { ReactChild } from 'react'
import styles from './Card.module.scss'

export type TCardProps = {
  title: string
  description?: string
  cta?: ReactChild
  image?: {
    src: string
    alt: string
    height?: number
    width?: number
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
          <Image fill src={image.src} alt={image.alt} />
        </figure>
      )}
    </section>
  )
}
