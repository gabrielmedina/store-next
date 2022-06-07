import React from 'react'
import styles from './Button.module.scss'

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLElement>> = ({
  onClick,
  children,
}) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}
