import Link from 'next/link'
import classNames from 'classnames'
import {
  TButtonProps,
  TButtonHTMLAnchorAttributes,
  TButtonHTMLButtonAttributes,
} from './Button.types'
import { sizeMapper, variantMapper } from './Button.mappers'
import styles from './Button.module.scss'

export const Button: React.FC<TButtonProps> = ({
  element = 'button',
  variant = 'primary',
  size = 'medium',
  rounded,
  fullWidth,
  children,
  disabled,
  className,
  ...rest
}) => {
  const sizeMap = sizeMapper({ styles })
  const variantMap = variantMapper({ styles })

  const buttonClasses = classNames(
    styles.button,
    sizeMap[size].className,
    variantMap[variant].className,
    {
      [styles.rounded]: rounded,
      [styles.fullWidth]: fullWidth,
      [styles.disabled]: disabled,
    },
    className
  )

  if (element === 'a') {
    const { href, ...restAnchorAttrs } = rest as TButtonHTMLAnchorAttributes

    return (
      <Link href={href!}>
        <a className={buttonClasses} {...restAnchorAttrs}>
          {children}
        </a>
      </Link>
    )
  }

  return (
    <button
      className={classNames(
        styles.button,
        sizeMap[size].className,
        variantMap[variant].className,
        {
          [styles.rounded]: rounded,
          [styles.fullWidth]: fullWidth,
        },
        className
      )}
      {...(rest as TButtonHTMLButtonAttributes)}
    >
      {children}
    </button>
  )
}
