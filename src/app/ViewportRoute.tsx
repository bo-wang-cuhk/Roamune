import type { ComponentType } from 'react'
import { useIsPhone } from '../mobile/useIsPhone'

type ViewportRouteProps = {
  phone: ComponentType
  desktop: ComponentType
}

/** Selects the page tree before rendering, following TREK's ViewportRoute. */
export function ViewportRoute({ phone: Phone, desktop: Desktop }: ViewportRouteProps) {
  return useIsPhone() ? <Phone /> : <Desktop />
}
