import { ArrowRight, Database, Luggage, MapPin, Plus } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useTrips } from '../../app/TripsProvider'
import { DesktopEmptyState } from '../components/DesktopEmptyState'
import { DesktopTripCard } from '../components/DesktopTripCard'
import { TripCoverMedia } from '../../components/TripCoverMedia'

export function DesktopHomePage() {
  const navigate = useNavigate()
  const { trips, loading, error, refresh } = useTrips()
  const recent = trips[0]
  const destinations = new Set(trips.map((trip) => trip.destination)).size

  return (
    <main className="d-page d-dashboard">
      <header className="d-page-heading d-dashboard-heading">
        <div>
          <span className="d-kicker"><span /> Your travel space</span>
          <h1>Welcome back.</h1>
          <p>Your journeys are ready whenever you are.</p>
        </div>
        <button type="button" className="d-primary-action" onClick={() => navigate('/trips?create=1')}>
          <Plus size={17} /> New trip
        </button>
      </header>

      {error && (
        <div className="d-error" role="alert">
          <span>{error}</span>
          <button type="button" onClick={() => void refresh()}>Retry</button>
        </div>
      )}

      {loading ? (
        <div className="d-hero-skeleton" aria-label="Loading journeys" />
      ) : recent ? (
        <>
          <section className="d-spotlight" role="button" tabIndex={0} onClick={() => navigate(`/trips/${recent.id}`)} onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') navigate(`/trips/${recent.id}`)
          }}>
            <TripCoverMedia coverImage={recent.coverImage} seed={recent.id} />
            <div className="d-spotlight-scrim" />
            <div className="d-spotlight-content">
              <span className="d-spotlight-badge"><span /> Recently updated</span>
              <div className="d-spotlight-title">
                <span>Journey</span>
                <h2>{recent.title}</h2>
                <p><MapPin size={16} /> {recent.destination}</p>
              </div>
              <button type="button" aria-label={`Open ${recent.title}`}><ArrowRight size={20} /></button>
            </div>
          </section>

          <section className="d-stats" aria-label="Travel overview">
            <div><span className="d-stat-icon"><Luggage size={18} /></span><span><small>Total trips</small><strong>{trips.length}</strong></span></div>
            <div><span className="d-stat-icon"><MapPin size={18} /></span><span><small>Destinations</small><strong>{destinations}</strong></span></div>
            <div><span className="d-stat-icon"><Database size={18} /></span><span><small>Storage</small><strong>Local</strong></span></div>
          </section>

          {trips.length > 1 && (
            <section className="d-section">
              <div className="d-section-header">
                <div><span>TRIPS</span><h2>Your journeys</h2></div>
                <button type="button" onClick={() => navigate('/trips')}>View all <ArrowRight size={15} /></button>
              </div>
              <div className="d-trip-grid">
                {trips.slice(1, 4).map((trip) => (
                  <DesktopTripCard key={trip.id} trip={trip} onOpen={() => navigate(`/trips/${trip.id}`)} />
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        <DesktopEmptyState onCreate={() => navigate('/trips?create=1')} />
      )}
    </main>
  )
}
