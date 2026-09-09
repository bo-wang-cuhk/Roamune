import { CalendarDays, LayoutGrid, Plus, Settings, type LucideIcon } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useLocation, useNavigate } from 'react-router'

export function BottomNavigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const onSettings = location.pathname.startsWith('/settings')
  const item = (path: string, label: string, Icon: LucideIcon, dashboard = false) => {
    const active = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
    return (
      <button type="button" className={`nav-item${active ? ' active' : ''}`} aria-label={label} aria-current={active ? 'page' : undefined} onClick={() => navigate(path)}>
        <Icon size={dashboard ? 18 : 21} strokeWidth={dashboard ? 2.1 : 1.9} />
      </button>
    )
  }

  return createPortal(
    <div className="bottom-nav-layer">
      <nav className="bottom-nav" aria-label="Main navigation">
        <div className="nav-group">
          {item('/', 'Home', LayoutGrid, true)}
          {item('/trips', 'Trips', CalendarDays)}
        </div>
        {onSettings ? (
          <span className="nav-logo" aria-hidden="true"><img src="./icons/icon-dark.svg" alt="" /></span>
        ) : (
          <button type="button" className="fab" aria-label="Create trip" onClick={() => navigate('/trips?create=1')}><Plus size={26} strokeWidth={2.4} /></button>
        )}
        <div className="nav-group right">
          {item('/settings', 'Settings', Settings)}
        </div>
      </nav>
    </div>,
    document.body,
  )
}
