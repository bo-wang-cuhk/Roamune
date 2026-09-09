import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { tripRepository } from '../repo/tripRepository'
import type { Trip, TripDraft, TripUpdate } from '../types/trip'

type TripsContextValue = {
  trips: Trip[]
  loading: boolean
  error: string | null
  create: (draft: TripDraft) => Promise<Trip>
  update: (id: string, updates: TripUpdate) => Promise<Trip>
  remove: (id: string) => Promise<void>
  refresh: () => Promise<void>
}

const TripsContext = createContext<TripsContextValue | null>(null)

export function TripsProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      setError(null)
      setTrips(await tripRepository.getAllTrips())
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not load trips')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void refresh() }, [refresh])

  const create = useCallback(async (draft: TripDraft) => {
    const trip = await tripRepository.createTrip(draft)
    setTrips((current) => [trip, ...current])
    return trip
  }, [])

  const update = useCallback(async (id: string, updates: TripUpdate) => {
    const trip = await tripRepository.updateTrip(id, updates)
    setTrips((current) => [trip, ...current.filter((item) => item.id !== id)])
    return trip
  }, [])

  const remove = useCallback(async (id: string) => {
    await tripRepository.deleteTrip(id)
    setTrips((current) => current.filter((trip) => trip.id !== id))
  }, [])

  const value = useMemo(
    () => ({ trips, loading, error, create, update, remove, refresh }),
    [trips, loading, error, create, update, remove, refresh],
  )

  return <TripsContext.Provider value={value}>{children}</TripsContext.Provider>
}

export function useTrips() {
  const value = useContext(TripsContext)
  if (!value) throw new Error('useTrips must be used inside TripsProvider')
  return value
}

