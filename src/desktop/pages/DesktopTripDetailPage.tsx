import { ArrowLeft, CalendarDays, MapPin, Pencil, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useTrips } from '../../app/TripsProvider'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import { formatDateRange } from '../../components/TripCard'
import { TripFormSheet } from '../../components/TripForm'
import { TripCoverMedia } from '../../components/TripCoverMedia'
import type { TripDraft } from '../../types/trip'

export function DesktopTripDetailPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { trips, loading, update, remove } = useTrips()
  const trip = useMemo(() => trips.find((item) => item.id === id), [trips, id])
  const [editing, setEditing] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)

  if (loading) return <main className="d-detail-state">Loading journey…</main>
  if (!trip) {
    return (
      <main className="d-detail-state">
        <span className="d-kicker"><span /> Journey</span>
        <h1>Trip not found</h1>
        <p>It may have been deleted from this device.</p>
        <button type="button" className="d-primary-action" onClick={() => navigate('/trips')}>Back to trips</button>
      </main>
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
    <main className="d-detail-page">
      <section className="d-detail-hero">
        <TripCoverMedia coverImage={trip.coverImage} seed={trip.id} />
        <div className="d-detail-scrim" />
        <div className="d-detail-actions">
          <button type="button" onClick={() => navigate(-1)}><ArrowLeft size={17} /> Back</button>
          <button type="button" onClick={() => setEditing(true)}><Pencil size={15} /> Edit trip</button>
        </div>
        <div className="d-detail-title">
          <span>Journey</span>
          <h1>{trip.title}</h1>
          <p><MapPin size={16} /> {trip.destination}</p>
        </div>
      </section>

      <div className="d-detail-body">
        <aside className="d-detail-sidebar">
          <span className="d-panel-label">TRIP DETAILS</span>
          <div className="d-detail-fact">
            <span><MapPin size={17} /></span>
            <div><small>Destination</small><strong>{trip.destination}</strong></div>
          </div>
          <div className="d-detail-fact">
            <span><CalendarDays size={17} /></span>
            <div><small>Date</small><strong>{formatDateRange(trip.startDate, trip.endDate)}</strong></div>
          </div>
          <div className="d-sidebar-spacer" />
          <button type="button" className="d-delete-action" onClick={() => setConfirming(true)}><Trash2 size={16} /> Delete trip</button>
        </aside>

        <section className="d-detail-panel">
          <div className="d-detail-panel-heading">
            <div><span className="d-panel-label">PRIVATE NOTES</span><h2>Notes</h2></div>
            <button type="button" onClick={() => setEditing(true)}><Pencil size={15} /> Edit</button>
          </div>
          {trip.notes
            ? <p className="d-notes-copy">{trip.notes}</p>
            : <div className="d-notes-empty"><p>No notes yet.</p><span>Edit this trip to add the details you want to remember.</span></div>}
        </section>
      </div>

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
