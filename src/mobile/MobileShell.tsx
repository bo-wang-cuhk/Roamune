import type { ReactNode } from 'react'
import { useLocation, matchPath } from 'react-router'
import { BottomNavigation } from './components/BottomNavigation'
import './mobile.css'

export function MobileShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const detail = matchPath('/trips/:id', pathname)
  return (
    <div className={`mobile-root${detail ? ' detail-route' : ''}`}>
      <div className="screen-background" aria-hidden="true" />
      <div className="shell-content">{children}</div>
      {!detail && <BottomNavigation />}
      <div id="sheet-root" />
    </div>
  )
}

