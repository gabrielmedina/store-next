import { ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'
import styles from './Button.module.scss'

export type TButtonProps = {
  variant?: 'primary' | 'secondary'
  rounded?: boolean
  fullWidth?: boolean
}

export const Button: React.FC<
  TButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  variant = 'primary',
  rounded,
  fullWidth,
  onClick,
  children,
  className,
}) => {
  const variantMap = {
    primary: {
      className: styles.variantPrimary,
    },
    secondary: {
      className: styles.variantSecondary,
    },
  }

  return (
    <button
      className={classNames(
        styles.button,
        variantMap[variant].className,
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
