import { useEffect, useState } from 'react'
import { CalendarDays, ChevronRight, LayoutGrid, MoreHorizontal, Plus, Settings, type LucideIcon } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'

export function BottomNavigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const [moreOpen, setMoreOpen] = useState(false)
  const onSettings = location.pathname.startsWith('/settings')

  useEffect(() => setMoreOpen(false), [location.pathname])

  const item = (path: string, label: string, Icon: LucideIcon, dashboard = false) => {
    const active = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
    return (
      <button type="button" className={`nav-item${active ? ' active' : ''}`} aria-label={label} aria-current={active ? 'page' : undefined} onClick={() => navigate(path)}>
        <Icon size={dashboard ? 18 : 21} strokeWidth={dashboard ? 2.1 : 1.9} />
      </button>
    )
  }

  return (
    <>
      {moreOpen && (
        <div className="nav-more-layer" role="presentation" onClick={() => setMoreOpen(false)}>
          <div className="nav-more-popover" role="presentation" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="nav-more-row" onClick={() => navigate('/settings')}>
              <span className="nav-more-icon"><Settings size={20} strokeWidth={2} /></span>
              <span>Settings</span>
              <ChevronRight size={17} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}

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
          <button
            type="button"
            className={`nav-item${onSettings ? ' active' : ''}`}
            aria-label="More"
            aria-expanded={moreOpen}
            aria-current={onSettings ? 'page' : undefined}
            onClick={() => setMoreOpen((open) => !open)}
          >
            <MoreHorizontal size={21} strokeWidth={1.9} />
          </button>
        </div>
      </nav>
    </>
  )
}
