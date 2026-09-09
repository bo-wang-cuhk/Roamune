import { LayoutGrid, Plus } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useTrips } from '../../app/TripsProvider'
import { DesktopEmptyState } from '../components/DesktopEmptyState'
import { DesktopTripCard } from '../components/DesktopTripCard'

export function DesktopTripsPage() {
  const navigate = useNavigate()
  const { trips, loading, error, refresh } = useTrips()

  return (
    <main className="d-page d-library-page">
      <header className="d-page-heading d-library-heading">
        <div>
          <span className="d-kicker"><span /> Travel library</span>
          <h1>All trips</h1>
          <p>Every journey stays private on this device.</p>
        </div>
        <div className="d-heading-actions">
          <span className="d-count-chip"><LayoutGrid size={15} /> {trips.length} {trips.length === 1 ? 'journey' : 'journeys'}</span>
          <button type="button" className="d-primary-action" onClick={() => navigate('/trips?create=1')}><Plus size={17} /> New trip</button>
        </div>
      </header>

      {error && (
        <div className="d-error" role="alert"><span>{error}</span><button type="button" onClick={() => void refresh()}>Retry</button></div>
      )}

      {loading ? (
        <div className="d-trip-grid d-library-grid" aria-label="Loading journeys">
          <div className="d-card-skeleton" /><div className="d-card-skeleton" /><div className="d-card-skeleton" />
        </div>
      ) : trips.length ? (
        <div className="d-trip-grid d-library-grid">
          {trips.map((trip) => <DesktopTripCard key={trip.id} trip={trip} onOpen={() => navigate(`/trips/${trip.id}`)} />)}
        </div>
      ) : (
        <DesktopEmptyState onCreate={() => navigate('/trips?create=1')} />
      )}
    </main>
  )
}
