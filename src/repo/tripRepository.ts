import { requestToPromise, withStore } from '../db/db'
import { TRIPS_STORE } from '../db/schema'
import type { Trip, TripDraft, TripUpdate } from '../types/trip'

function normalizeDraft(draft: TripDraft): TripDraft {
  const title = draft.title.trim()
  const destination = draft.destination.trim()
  if (!title) throw new Error('Trip title is required')
  if (!destination) throw new Error('Destination is required')
  if (!draft.startDate || !draft.endDate) throw new Error('Start and end dates are required')
  if (draft.endDate < draft.startDate) throw new Error('End date cannot be before start date')

  return {
    title,
    destination,
    startDate: draft.startDate,
    endDate: draft.endDate,
    coverImage: draft.coverImage || null,
    notes: draft.notes.trim(),
  }
}

function createId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export async function getAllTrips(): Promise<Trip[]> {
  const trips = await withStore(TRIPS_STORE, 'readonly', (store) =>
    requestToPromise(store.getAll() as IDBRequest<Trip[]>),
  )
  return trips.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

export async function getTrip(id: string): Promise<Trip | undefined> {
  return withStore(TRIPS_STORE, 'readonly', (store) =>
    requestToPromise(store.get(id) as IDBRequest<Trip | undefined>),
  )
}

export async function createTrip(draft: TripDraft): Promise<Trip> {
  const normalized = normalizeDraft(draft)
  const now = new Date().toISOString()
  const trip: Trip = {
    id: createId(),
    ...normalized,
    createdAt: now,
    updatedAt: now,
  }

  await withStore(TRIPS_STORE, 'readwrite', async (store) => {
    await requestToPromise(store.add(trip))
  })
  return trip
}

export async function updateTrip(id: string, updates: TripUpdate): Promise<Trip> {
  return withStore(TRIPS_STORE, 'readwrite', async (store) => {
    const existing = await requestToPromise(store.get(id) as IDBRequest<Trip | undefined>)
    if (!existing) throw new Error('Trip not found')

    const normalized = normalizeDraft({
      title: updates.title ?? existing.title,
      destination: updates.destination ?? existing.destination,
      startDate: updates.startDate ?? existing.startDate,
      endDate: updates.endDate ?? existing.endDate,
      coverImage: updates.coverImage === undefined ? existing.coverImage : updates.coverImage,
      notes: updates.notes ?? existing.notes,
    })
    const trip: Trip = { ...existing, ...normalized, updatedAt: new Date().toISOString() }
    await requestToPromise(store.put(trip))
    return trip
  })
}

export async function deleteTrip(id: string): Promise<void> {
  await withStore(TRIPS_STORE, 'readwrite', async (store) => {
    await requestToPromise(store.delete(id))
  })
}

export const tripRepository = {
  getAllTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip,
}

