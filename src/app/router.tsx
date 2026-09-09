import { Navigate, Route, Routes } from 'react-router'
import { HomePage } from '../pages/Home/HomePage'
import { SettingsPage } from '../pages/Settings/SettingsPage'
import { TripDetailPage } from '../pages/TripDetail/TripDetailPage'
import { TripsPage } from '../pages/Trips/TripsPage'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/trips" element={<TripsPage />} />
      <Route path="/trips/:id" element={<TripDetailPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

