import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { useIsPhone } from '../mobile/useIsPhone'
import { ViewportRoute } from './ViewportRoute'

// Match TREK's route-level split: only the selected viewport tree is fetched.
const HomePage = lazy(() => import('../pages/Home/HomePage').then((module) => ({ default: module.HomePage })))
const TripsPage = lazy(() => import('../pages/Trips/TripsPage').then((module) => ({ default: module.TripsPage })))
const TripDetailPage = lazy(() => import('../pages/TripDetail/TripDetailPage').then((module) => ({ default: module.TripDetailPage })))
const SettingsPage = lazy(() => import('../pages/Settings/SettingsPage').then((module) => ({ default: module.SettingsPage })))
const DesktopHomePage = lazy(() => import('../desktop/pages/DesktopHomePage').then((module) => ({ default: module.DesktopHomePage })))
const DesktopTripsPage = lazy(() => import('../desktop/pages/DesktopTripsPage').then((module) => ({ default: module.DesktopTripsPage })))
const DesktopTripDetailPage = lazy(() => import('../desktop/pages/DesktopTripDetailPage').then((module) => ({ default: module.DesktopTripDetailPage })))
const DesktopSettingsPage = lazy(() => import('../desktop/pages/DesktopSettingsPage').then((module) => ({ default: module.DesktopSettingsPage })))

function RouteFallback() {
  const isPhone = useIsPhone()
  return <main className={isPhone ? 'route-loading mobile' : 'route-loading desktop'}>Loading…</main>
}

export function AppRouter() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<ViewportRoute phone={HomePage} desktop={DesktopHomePage} />} />
        <Route path="/trips" element={<ViewportRoute phone={TripsPage} desktop={DesktopTripsPage} />} />
        <Route path="/trips/:id" element={<ViewportRoute phone={TripDetailPage} desktop={DesktopTripDetailPage} />} />
        <Route path="/settings" element={<ViewportRoute phone={SettingsPage} desktop={DesktopSettingsPage} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
