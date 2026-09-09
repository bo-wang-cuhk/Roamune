import { Database, Home, Luggage, Plus, Settings } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'

const links = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/trips', label: 'Trips', icon: Luggage },
]

export function DesktopNavbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const isActive = (path: string) => path === '/'
    ? location.pathname === '/'
    : location.pathname.startsWith(path)

  return (
    <nav className="d-navbar" aria-label="Main navigation">
      <button type="button" className="d-brand" onClick={() => navigate('/')} aria-label="Roamune home">
        <img src="./icons/icon-dark.svg" alt="" />
        <span>Roamune</span>
      </button>

      <div className="d-nav-pill">
        {links.map(({ path, label, icon: Icon }) => (
          <button
            key={path}
            type="button"
            className={isActive(path) ? 'active' : ''}
            aria-current={isActive(path) ? 'page' : undefined}
            onClick={() => navigate(path)}
          >
            <Icon size={16} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="d-nav-actions">
        <span className="d-device-badge"><Database size={14} /> This device</span>
        <button type="button" className="d-create-button" onClick={() => navigate('/trips?create=1')}>
          <Plus size={16} /> New trip
        </button>
        <button
          type="button"
          className={`d-icon-button${location.pathname.startsWith('/settings') ? ' active' : ''}`}
          aria-label="Settings"
          onClick={() => navigate('/settings')}
        >
          <Settings size={18} />
        </button>
      </div>
    </nav>
  )
}
