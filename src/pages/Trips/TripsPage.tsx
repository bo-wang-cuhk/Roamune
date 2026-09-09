import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useTrips } from '../../app/TripsProvider'
import { EmptyState } from '../../components/EmptyState'
import { GlassHeader } from '../../components/GlassHeader'
import { TripCard } from '../../components/TripCard'

export function TripsPage() {
  const navigate = useNavigate()
  const { trips, loading, error, refresh } = useTrips()

  return (
    <>
      <GlassHeader
        title="Trips"
        subtitle={loading ? 'Loading…' : `${trips.length} ${trips.length === 1 ? 'journey' : 'journeys'}`}
        trailing={<button className="header-action" type="button" aria-label="Create trip" onClick={() => navigate('/trips?create=1')}><Plus size={18} /></button>}
      />
      <main className="page-content trips-page">
        <div className="page-heading"><span className="section-eyebrow">Travel library</span><h1>All trips</h1><p>Every journey stays private on this device.</p></div>
        {error && <div className="error-banner" role="alert"><span>{error}</span><button onClick={() => void refresh()}>Retry</button></div>}
        {loading ? (
          <div className="trip-list"><div className="trip-card-skeleton" /><div className="trip-card-skeleton short" /></div>
        ) : trips.length ? (
          <div className="trip-list">{trips.map((trip) => <TripCard key={trip.id} trip={trip} onOpen={() => navigate(`/trips/${trip.id}`)} />)}</div>
        ) : (
          <EmptyState onCreate={() => navigate('/trips?create=1')} />
        )}
      </main>
    </>
  )
}

