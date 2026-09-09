import { CloudOff, Database, HardDrive, Info, LockKeyhole, WifiOff } from 'lucide-react'
import { GlassHeader } from '../../components/GlassHeader'

export function SettingsPage() {
  return (
    <>
      <GlassHeader title="Settings" subtitle="Roamune" trailing={<span className="header-icon"><Info size={16} /></span>} />
      <main className="page-content settings-page">
        <div className="page-heading"><span className="section-eyebrow">App</span><h1>Settings</h1><p>Simple by design. Your travel data remains on this device.</p></div>

        <section className="settings-card">
          <div className="settings-title"><Info size={17} /><h2>App information</h2></div>
          <div className="settings-row"><span className="settings-row-icon"><LockKeyhole size={17} /></span><span><strong>Roamune</strong><small>Mobile-first travel journal</small></span><em>v0.1.0</em></div>
          <div className="settings-row"><span className="settings-row-icon"><WifiOff size={17} /></span><span><strong>Offline ready</strong><small>Core trips work without a network</small></span><em>On</em></div>
        </section>

        <section className="settings-card">
          <div className="settings-title"><HardDrive size={17} /><h2>Storage</h2></div>
          <div className="settings-row"><span className="settings-row-icon"><Database size={17} /></span><span><strong>IndexedDB</strong><small>Each device keeps an independent database</small></span><em>Local</em></div>
          <p className="settings-hint">Clearing this browser's site data will remove every saved trip on this device.</p>
        </section>

        <section className="settings-card">
          <div className="settings-title"><CloudOff size={17} /><h2>Sync</h2><span className="coming-badge">Coming later</span></div>
          <div className="settings-row"><span className="settings-row-icon"><CloudOff size={17} /></span><span><strong>GitHub Sync</strong><small>Not included in this release</small></span><em>Off</em></div>
          <p className="settings-hint">No account, token, remote storage or device sync is used in this MVP.</p>
        </section>
      </main>
    </>
  )
}

