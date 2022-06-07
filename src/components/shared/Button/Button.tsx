import React from 'react'
import classNames from 'classnames'
import styles from './Button.module.scss'

type TButtonProps = {
  variant?: 'primary' | 'secondary'
}

export const Button: React.FC<
  TButtonProps & React.ButtonHTMLAttributes<HTMLElement>
> = ({ variant = 'primary', onClick, children }) => {
  return (
    <button
      className={classNames(styles.button, styles[variant])}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
