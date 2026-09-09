import { CloudOff, Database, HardDrive, Info, LockKeyhole, Settings, WifiOff, type LucideIcon } from 'lucide-react'
import { useState } from 'react'

type SettingsSection = 'app' | 'storage' | 'sync'

const tabs: { id: SettingsSection; label: string; icon: LucideIcon }[] = [
  { id: 'app', label: 'App information', icon: Info },
  { id: 'storage', label: 'Storage', icon: HardDrive },
  { id: 'sync', label: 'Sync', icon: CloudOff },
]

export function DesktopSettingsPage() {
  const [active, setActive] = useState<SettingsSection>('app')

  return (
    <main className="d-page d-settings-page">
      <header className="d-settings-heading">
        <span className="d-settings-heading-icon"><Settings size={21} /></span>
        <div><h1>Settings</h1><p>Manage how Roamune works on this device.</p></div>
      </header>

      <div className="d-settings-shell">
        <aside className="d-settings-sidebar">
          <span className="d-panel-label">SETTINGS</span>
          <nav aria-label="Settings sections">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button key={id} type="button" className={active === id ? 'active' : ''} onClick={() => setActive(id)}>
                <Icon size={16} /><span>{label}</span>
              </button>
            ))}
          </nav>
          <span className="d-settings-version">Roamune v0.1.0</span>
        </aside>

        <section className="d-settings-panel">
          {active === 'app' && (
            <SettingsPanel title="App information" description="Roamune is designed as a private, local-first travel journal.">
              <SettingsRow icon={LockKeyhole} title="Roamune" description="Travel journal for your personal journeys" value="v0.1.0" />
              <SettingsRow icon={WifiOff} title="Offline ready" description="Core trips work without a network" value="On" />
            </SettingsPanel>
          )}
          {active === 'storage' && (
            <SettingsPanel title="Storage" description="Your current browser owns this copy of your travel data.">
              <SettingsRow icon={Database} title="IndexedDB" description="Each device keeps an independent database" value="Local" />
              <div className="d-settings-notice"><HardDrive size={17} /><p>Clearing this browser's site data will remove every saved trip on this device.</p></div>
            </SettingsPanel>
          )}
          {active === 'sync' && (
            <SettingsPanel title="Sync" description="Remote sync is not included in this release.">
              <SettingsRow icon={CloudOff} title="GitHub Sync" description="No account, token, or remote storage is currently used" value="Off" />
              <div className="d-settings-notice"><CloudOff size={17} /><p>Device-to-device sync will be added after the trip data model is finalized.</p></div>
            </SettingsPanel>
          )}
        </section>
      </div>
    </main>
  )
}

function SettingsPanel({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <>
      <header className="d-settings-panel-heading"><h2>{title}</h2><p>{description}</p></header>
      <div className="d-settings-rows">{children}</div>
    </>
  )
}

function SettingsRow({ icon: Icon, title, description, value }: { icon: LucideIcon; title: string; description: string; value: string }) {
  return (
    <div className="d-settings-row">
      <span><Icon size={18} /></span>
      <div><strong>{title}</strong><small>{description}</small></div>
      <em>{value}</em>
    </div>
  )
}
