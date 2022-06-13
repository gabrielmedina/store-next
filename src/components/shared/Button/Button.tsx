import React from 'react'
import classNames from 'classnames'
import styles from './Button.module.scss'

type TButtonProps = {
  variant?: 'primary' | 'secondary'
  rounded?: boolean
  fullWidth?: boolean
}

export const Button: React.FC<
  TButtonProps & React.ButtonHTMLAttributes<HTMLElement>
> = ({
  variant = 'primary',
  rounded,
  fullWidth,
  onClick,
  children,
  className,
}) => {
  return (
    <button
      className={classNames(
        styles.button,
        styles[variant],
        {
          [styles.rounded]: rounded,
          [styles.fullWidth]: fullWidth,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
