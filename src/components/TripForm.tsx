import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Camera, ImageOff, X } from 'lucide-react'
import { prepareCoverImage } from '../services/imageService'
import type { Trip, TripDraft } from '../types/trip'
import { TripCoverMedia } from './TripCoverMedia'

const blankDraft: TripDraft = {
  title: '',
  destination: '',
  startDate: '',
  endDate: '',
  coverImage: null,
  notes: '',
}

type TripFormProps = {
  trip?: Trip
  onSubmit: (draft: TripDraft) => Promise<void>
  onCancel: () => void
}

export function TripForm({ trip, onSubmit, onCancel }: TripFormProps) {
  const [draft, setDraft] = useState<TripDraft>(trip ? {
    title: trip.title,
    destination: trip.destination,
    startDate: trip.startDate,
    endDate: trip.endDate,
    coverImage: trip.coverImage,
    notes: trip.notes,
  } : blankDraft)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [processingImage, setProcessingImage] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (draft.endDate && draft.startDate && draft.endDate < draft.startDate) {
      setDraft((current) => ({ ...current, endDate: current.startDate }))
    }
  }, [draft.startDate, draft.endDate])

  const set = <K extends keyof TripDraft>(key: K, value: TripDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  const selectImage = async (file?: File) => {
    if (!file) return
    try {
      setProcessingImage(true)
      setError('')
      set('coverImage', await prepareCoverImage(file))
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not use this image')
    } finally {
      setProcessingImage(false)
    }
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (draft.endDate < draft.startDate) {
      setError('End date cannot be before start date.')
      return
    }
    try {
      setBusy(true)
      setError('')
      await onSubmit(draft)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not save this trip')
      setBusy(false)
    }
  }

  return (
    <form className="trip-form" onSubmit={submit}>
      <div className="form-cover">
        <TripCoverMedia coverImage={draft.coverImage} seed={trip?.id ?? (draft.title || 'new-trip')} alt="Selected trip cover" />
        <div className="cover-controls">
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            hidden
            onChange={(event) => { void selectImage(event.target.files?.[0]); event.target.value = '' }}
          />
          <button type="button" className="cover-button" onClick={() => fileInput.current?.click()} disabled={processingImage}>
            <Camera size={14} /> {processingImage ? 'Preparing…' : draft.coverImage ? 'Change' : 'Choose cover'}
          </button>
          {draft.coverImage && (
            <button type="button" className="cover-icon-button" aria-label="Remove cover image" onClick={() => set('coverImage', null)}>
              <ImageOff size={15} />
            </button>
          )}
        </div>
      </div>

      <div className="field-box">
        <label htmlFor="trip-title">Title</label>
        <input id="trip-title" required autoFocus value={draft.title} onChange={(event) => set('title', event.target.value)} placeholder="Summer in Kyoto" />
      </div>
      <div className="field-box">
        <label htmlFor="trip-destination">Destination</label>
        <input id="trip-destination" required value={draft.destination} onChange={(event) => set('destination', event.target.value)} placeholder="Kyoto, Japan" />
      </div>
      <div className="date-fields">
        <div className="field-box">
          <label htmlFor="trip-start">Start date</label>
          <input id="trip-start" type="date" required value={draft.startDate} onChange={(event) => set('startDate', event.target.value)} />
        </div>
        <div className="field-box">
          <label htmlFor="trip-end">End date</label>
          <input id="trip-end" type="date" required min={draft.startDate} value={draft.endDate} onChange={(event) => set('endDate', event.target.value)} />
        </div>
      </div>
      <div className="field-box">
        <label htmlFor="trip-notes">Notes</label>
        <textarea id="trip-notes" rows={5} value={draft.notes} onChange={(event) => set('notes', event.target.value)} placeholder="Things you want to remember…" />
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="sheet-actions sticky-actions">
        <button type="button" className="secondary-button" onClick={onCancel} disabled={busy}>Cancel</button>
        <button type="submit" className="primary-button" disabled={busy || processingImage}>
          {busy ? 'Saving…' : trip ? 'Save changes' : 'Create trip'}
        </button>
      </div>
    </form>
  )
}

export function TripFormSheet({ open, trip, onSubmit, onClose }: {
  open: boolean
  trip?: Trip
  onSubmit: (draft: TripDraft) => Promise<void>
  onClose: () => void
}) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    document.body.classList.add('sheet-open')
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.classList.remove('sheet-open')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="sheet-layer" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="form-sheet" role="dialog" aria-modal="true" aria-labelledby="form-sheet-title">
        <div className="sheet-handle" />
        <div className="sheet-heading">
          <div><span className="section-eyebrow">Journey</span><h2 id="form-sheet-title">{trip ? 'Edit trip' : 'New trip'}</h2></div>
          <button type="button" className="icon-button" aria-label="Close" onClick={onClose}><X size={18} /></button>
        </div>
        <TripForm key={trip?.id ?? 'new'} trip={trip} onSubmit={onSubmit} onCancel={onClose} />
      </section>
    </div>
  )
}
