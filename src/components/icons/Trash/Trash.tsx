import React from 'react'
import { TIcon } from '../types'

export const IconTrash: React.FC<TIcon & React.HTMLAttributes<HTMLElement>> = ({
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
        d="M384 151.545H128"
        stroke={color}
        strokeWidth="23.2727"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M221.091 221.364V314.455"
        stroke={color}
        strokeWidth="23.2727"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M290.909 221.364V314.455"
        stroke={color}
        strokeWidth="23.2727"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M360.727 151.545V372.636C360.727 375.722 359.501 378.682 357.319 380.864C355.137 383.047 352.177 384.273 349.091 384.273H162.909C159.823 384.273 156.863 383.047 154.681 380.864C152.499 378.682 151.273 375.722 151.273 372.636V151.545"
        stroke={color}
        strokeWidth="23.2727"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M314.182 151.545V128.273C314.182 122.1 311.73 116.181 307.365 111.816C303.001 107.452 297.081 105 290.909 105H221.091C214.919 105 208.999 107.452 204.635 111.816C200.27 116.181 197.818 122.1 197.818 128.273V151.545"
        stroke={color}
        strokeWidth="23.2727"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
