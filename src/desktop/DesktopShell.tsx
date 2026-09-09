import type { ReactNode } from 'react'
import { DesktopNavbar } from './components/DesktopNavbar'
import './desktop.css'

export function DesktopShell({ children }: { children: ReactNode }) {
  return (
    <div className="desktop-root">
      <DesktopNavbar />
      <div className="desktop-content">{children}</div>
      <div id="sheet-root" />
    </div>
  )
}
