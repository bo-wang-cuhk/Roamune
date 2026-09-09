import { ArrowRight, CalendarDays, MapPin } from 'lucide-react'
import type { Trip } from '../types/trip'
import { TripCoverMedia } from './TripCoverMedia'

function displayDate(value: string) {
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(date)
}

export function formatDateRange(startDate: string, endDate: string) {
  return `${displayDate(startDate)} – ${displayDate(endDate)}`
}

export function TripCard({ trip, onOpen, featured = false }: { trip: Trip; onOpen: () => void; featured?: boolean }) {
  return (
    <article
      className={`trip-card${featured ? ' featured' : ''}`}
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onOpen() }}
    >
      <div className="trip-cover">
        <TripCoverMedia coverImage={trip.coverImage} seed={trip.id} />
        <div className="trip-cover-shade" />
        <span className="cover-badge"><span /> Journey</span>
        <div className="trip-cover-title">
          <h2>{trip.title}</h2>
          <span><MapPin size={13} /> {trip.destination}</span>
        </div>
      </div>
      <div className="trip-card-body">
        <span className="date-pill">
          <CalendarDays size={14} />
          <span>{displayDate(trip.startDate)}</span>
          <ArrowRight size={13} />
          <span>{displayDate(trip.endDate)}</span>
        </span>
      </div>
    </article>
  )
}
