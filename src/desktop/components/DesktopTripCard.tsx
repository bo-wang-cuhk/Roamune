import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react'
import type { Trip } from '../../types/trip'
import { formatDateRange } from '../../components/TripCard'
import { TripCoverMedia } from '../../components/TripCoverMedia'

export function DesktopTripCard({ trip, onOpen }: { trip: Trip; onOpen: () => void }) {
  return (
    <article className="d-trip-card" role="button" tabIndex={0} onClick={onOpen} onKeyDown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') onOpen()
    }}>
      <div className="d-trip-image">
        <TripCoverMedia coverImage={trip.coverImage} seed={trip.id} />
        <div className="d-trip-image-scrim" />
        <span className="d-trip-open"><ArrowUpRight size={17} /></span>
      </div>
      <div className="d-trip-card-body">
        <div><span className="d-card-label">Journey</span><h3>{trip.title}</h3></div>
        <p><MapPin size={14} /> {trip.destination}</p>
        <p><CalendarDays size={14} /> {formatDateRange(trip.startDate, trip.endDate)}</p>
      </div>
    </article>
  )
}
