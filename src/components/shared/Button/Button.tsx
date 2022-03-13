import React from 'react'
import styles from './Button.module.scss'

export const Button: React.FC<React.ButtonHTMLAttributes<any>> = ({
  ...props
}) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  )
}
