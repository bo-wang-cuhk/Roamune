import { ArrowLeft, CalendarDays, MapPin, Pencil, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useTrips } from '../../app/TripsProvider'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import { formatDateRange } from '../../components/TripCard'
import { TripFormSheet } from '../../components/TripForm'
import type { TripDraft } from '../../types/trip'

export function TripDetailPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { trips, loading, update, remove } = useTrips()
  const trip = useMemo(() => trips.find((item) => item.id === id), [trips, id])
  const [editing, setEditing] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)

  if (loading) return <main className="detail-loading">Loading journey…</main>
  if (!trip) {
    return (
      <main className="not-found-card"><h1>Trip not found</h1><p>It may have been deleted from this device.</p><button className="primary-button" onClick={() => navigate('/trips')}>Back to trips</button></main>
    )
  }

  const save = async (draft: TripDraft) => {
    await update(trip.id, draft)
    setEditing(false)
  }
  const confirmDelete = async () => {
    setDeleting(true)
    await remove(trip.id)
    navigate('/trips', { replace: true })
  }

  return (
    <main className="trip-detail">
      <section className="detail-cover">
        <img src={trip.coverImage ?? './assets/roamune-default-cover.jpg'} alt="" />
        <div className="detail-cover-shade" />
        <div className="detail-top-actions">
          <button type="button" className="cover-icon-button" aria-label="Back" onClick={() => navigate(-1)}><ArrowLeft size={19} /></button>
          <button type="button" className="cover-button" onClick={() => setEditing(true)}><Pencil size={14} /> Edit</button>
        </div>
        <div className="detail-title"><span className="section-eyebrow light">Journey</span><h1>{trip.title}</h1></div>
      </section>
      <section className="detail-content">
        <div className="detail-facts">
          <div><span className="fact-icon"><MapPin size={18} /></span><span><small>Destination</small><strong>{trip.destination}</strong></span></div>
          <div><span className="fact-icon"><CalendarDays size={18} /></span><span><small>Date</small><strong>{formatDateRange(trip.startDate, trip.endDate)}</strong></span></div>
        </div>
        <section className="notes-card">
          <div className="section-title-row"><h2>Notes</h2><span>Private</span></div>
          {trip.notes ? <p>{trip.notes}</p> : <p className="muted-notes">No notes yet. Edit this trip to add the details you want to remember.</p>}
        </section>
        <button type="button" className="delete-row" onClick={() => setConfirming(true)}><Trash2 size={17} /> Delete trip</button>
      </section>
      <TripFormSheet open={editing} trip={trip} onSubmit={save} onClose={() => setEditing(false)} />
      <ConfirmDialog
        open={confirming}
        title="Delete this trip?"
        message={`“${trip.title}” will be permanently removed from this device.`}
        busy={deleting}
        onCancel={() => setConfirming(false)}
        onConfirm={() => void confirmDelete()}
      />
    </main>
  )
}
