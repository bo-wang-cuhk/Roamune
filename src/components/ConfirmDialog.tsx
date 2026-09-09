import { AlertTriangle } from 'lucide-react'

type ConfirmDialogProps = {
  open: boolean
  title: string
  message: string
  busy?: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function ConfirmDialog({ open, title, message, busy, onCancel, onConfirm }: ConfirmDialogProps) {
  if (!open) return null
  return (
    <div className="sheet-layer" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onCancel()
    }}>
      <section className="confirm-card" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title">
        <span className="danger-icon"><AlertTriangle size={20} /></span>
        <h2 id="confirm-title">{title}</h2>
        <p>{message}</p>
        <div className="sheet-actions">
          <button type="button" className="secondary-button" onClick={onCancel} disabled={busy}>Cancel</button>
          <button type="button" className="danger-button" onClick={onConfirm} disabled={busy}>
            {busy ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </section>
    </div>
  )
}

