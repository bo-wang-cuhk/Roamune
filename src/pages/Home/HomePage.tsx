import { Database, Luggage, MapPin, Plus } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useTrips } from '../../app/TripsProvider'
import { EmptyState } from '../../components/EmptyState'
import { GlassHeader } from '../../components/GlassHeader'
import { TripCard } from '../../components/TripCard'

export function HomePage() {
  const navigate = useNavigate()
  const { trips, loading, error, refresh } = useTrips()
  const recent = trips[0]

  return (
    <>
      <GlassHeader
        title="Roamune"
        subtitle="Your travel journal"
        trailing={<span className="local-badge"><Database size={12} /> This device</span>}
      />
      <main className="page-content home-page">
        <section className="welcome-row">
          <div><span className="section-eyebrow">Welcome back</span><h1>Your journeys</h1></div>
          <div className="trip-count"><strong>{trips.length}</strong><span>{trips.length === 1 ? 'trip' : 'trips'}</span></div>
        </section>

        {error && (
          <div className="error-banner" role="alert"><span>{error}</span><button onClick={() => void refresh()}>Retry</button></div>
        )}
        {loading ? (
          <div className="loading-card"><span /><span /><span /></div>
        ) : recent ? (
          <section>
            <div className="section-title-row"><h2>Recently updated</h2><button onClick={() => navigate('/trips')}>View all</button></div>
            <TripCard trip={recent} featured onOpen={() => navigate(`/trips/${recent.id}`)} />
            <div className="quick-stats">
              <div><span className="stat-icon"><Luggage size={17} /></span><strong>{trips.length}</strong><small>Total trips</small></div>
              <div><span className="stat-icon"><MapPin size={17} /></span><strong>{new Set(trips.map((trip) => trip.destination)).size}</strong><small>Destinations</small></div>
            </div>
          </section>
        ) : <EmptyState onCreate={() => navigate('/trips?create=1')} compact />}

        {!loading && trips.length > 0 && (
          <button type="button" className="wide-create-button" onClick={() => navigate('/trips?create=1')}><Plus size={17} /> Create a new trip</button>
        )}
      </main>
    </>
  )
}
