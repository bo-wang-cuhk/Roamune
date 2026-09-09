import { Plus } from 'lucide-react'

export function DesktopEmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <section className="d-empty-state">
      <img src="./icons/icon-dark.svg" alt="" />
      <div>
        <span className="d-kicker light"><span /> Ready when you are</span>
        <h2>Where will you go next?</h2>
        <p>Create your first journey and keep the details close.</p>
        <button type="button" className="d-empty-action" onClick={onCreate}><Plus size={17} /> Create a trip</button>
      </div>
    </section>
  )
}
