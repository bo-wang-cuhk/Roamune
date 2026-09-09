import { Luggage, Plus } from 'lucide-react'

export function EmptyState({ onCreate, compact = false }: { onCreate: () => void; compact?: boolean }) {
  return (
    <section className={`empty-card${compact ? ' compact' : ''}`}>
      <span className="empty-icon"><Luggage size={28} strokeWidth={1.8} /></span>
      <h2>No trips yet</h2>
      <p>Start recording your first journey.</p>
      <button type="button" className="primary-button" onClick={onCreate}>
        <Plus size={16} strokeWidth={2.4} /> Create Trip
      </button>
    </section>
  )
}

