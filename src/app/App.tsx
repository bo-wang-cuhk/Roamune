import { useCallback } from 'react'
import { HashRouter, useLocation, useNavigate } from 'react-router'
import { MobileShell } from '../mobile/MobileShell'
import { TripFormSheet } from '../components/TripForm'
import type { TripDraft } from '../types/trip'
import { AppRouter } from './router'
import { TripsProvider, useTrips } from './TripsProvider'

function AppContent() {
  const location = useLocation()
  const navigate = useNavigate()
  const { create } = useTrips()
  const createOpen = new URLSearchParams(location.search).get('create') === '1'

  const closeCreate = useCallback(() => {
    navigate(location.pathname, { replace: true })
  }, [location.pathname, navigate])

  const createTrip = async (draft: TripDraft) => {
    const trip = await create(draft)
    navigate(`/trips/${trip.id}`, { replace: true })
  }

  return (
    <MobileShell>
      <AppRouter />
      <TripFormSheet open={createOpen} onSubmit={createTrip} onClose={closeCreate} />
    </MobileShell>
  )
}

export default function App() {
  return (
    <HashRouter>
      <TripsProvider>
        <AppContent />
      </TripsProvider>
    </HashRouter>
  )
}

