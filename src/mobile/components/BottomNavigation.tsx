import { Home, Luggage, Plus, Settings } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'

export function BottomNavigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const onSettings = location.pathname.startsWith('/settings')
  const item = (path: string, label: string, Icon: typeof Home) => {
    const active = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
    return (
      <button type="button" className={`nav-item${active ? ' active' : ''}`} aria-label={label} aria-current={active ? 'page' : undefined} onClick={() => navigate(path)}>
        <Icon size={21} strokeWidth={active ? 2.2 : 1.9} />
      </button>
    )
  }

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <div className="nav-group">
        {item('/', 'Home', Home)}
        {item('/trips', 'Trips', Luggage)}
      </div>
      {onSettings ? (
        <span className="nav-logo" aria-hidden="true"><img src="./icons/icon-dark.svg" alt="" /></span>
      ) : (
        <button type="button" className="fab" aria-label="Create trip" onClick={() => navigate('/trips?create=1')}><Plus size={26} strokeWidth={2.4} /></button>
      )}
      <div className="nav-group right">
        {item('/settings', 'Settings', Settings)}
        <span className="nav-spacer" aria-hidden="true" />
      </div>
    </nav>
  )
}

