import React from 'react'
import { TIcon } from '../types'

export const IconPlus: React.FC<TIcon & React.HTMLAttributes<HTMLElement>> = ({
  title,
  width = 24,
  height = 24,
  color,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <path
        d="M400 256H112M256 112V400V112Z"
        stroke={color}
        strokeWidth="32"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
