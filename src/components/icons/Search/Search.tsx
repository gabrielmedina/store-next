import React from 'react'
import { TIcon } from '../types'

export const IconSearch: React.FC<
  TIcon & React.HTMLAttributes<HTMLElement>
> = ({ title, width = 24, height = 24, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 512 512"
    >
      <title>{title}</title>
      <path
        d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
        fill="none"
        stroke={color}
        strokeMiterlimit="10"
        strokeWidth="32"
      />
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="32"
        d="M338.29 338.29L448 448"
      />
    </svg>
  )
}
