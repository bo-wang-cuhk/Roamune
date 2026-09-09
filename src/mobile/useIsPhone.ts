import { useEffect, useState } from 'react'

const PHONE_QUERY = '(max-width: 767px)'

/**
 * Matches TREK's viewport boundary: phones use the dedicated mobile tree,
 * while tablets and desktop browsers use the desktop tree.
 */
export function useIsPhone(): boolean {
  const [isPhone, setIsPhone] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(PHONE_QUERY).matches,
  )

  useEffect(() => {
    const media = window.matchMedia(PHONE_QUERY)
    const update = (event: MediaQueryListEvent) => setIsPhone(event.matches)
    setIsPhone(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return isPhone
}
