import React from 'react'
import { TIcon } from '../types'

export const IconClose: React.FC<TIcon & React.HTMLAttributes<HTMLElement>> = ({
  width = 24,
  height = 24,
  color,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 511 511"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M367.281 143.719L143.719 367.281M367.281 367.281L143.719 143.719L367.281 367.281Z"
        stroke={color}
        strokeWidth="31.9375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
