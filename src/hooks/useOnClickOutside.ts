import { MutableRefObject, useEffect } from 'react'

type TUseOnClickOutside = {
  ref: MutableRefObject<any>
  handler: (event: Event) => void
}

export const useOnClickOutside = ({ ref, handler }: TUseOnClickOutside) => {
  useEffect(() => {
    const listener = (event: Event) => {
      // Do nothing if clicking in ref or descendent elements
      if (!ref.current || ref.current.contains(event.target)) return

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
