import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

export type TButtonVariants = 'primary' | 'secondary'
export type TButtonSizes = 'tiny' | 'small' | 'medium'

export type TButtonHTMLButtonAttributes =
  ButtonHTMLAttributes<HTMLButtonElement>
export type TButtonHTMLAnchorAttributes =
  AnchorHTMLAttributes<HTMLAnchorElement> &
    Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>

type TButtonConditionalProps =
  | ({ element?: 'a' } & TButtonHTMLAnchorAttributes)
  | ({ element?: 'button' } & TButtonHTMLButtonAttributes)

export type TButtonProps = {
  variant?: TButtonVariants
  size?: TButtonSizes
  rounded?: boolean
  fullWidth?: boolean
} & TButtonConditionalProps
