import type { ReactNode } from 'react'

type GlassHeaderProps = {
  title?: string
  subtitle?: string
  leading?: ReactNode
  trailing?: ReactNode
}

export function GlassHeader({ title, subtitle, leading, trailing }: GlassHeaderProps) {
  return (
    <header className="glass-header">
      {leading ?? (
        <span className="brand-tile" aria-hidden="true">
          <img src="./icons/icon-white.svg" alt="" />
        </span>
      )}
      {(title || subtitle) && (
        <div className="header-copy">
          {title && <strong>{title}</strong>}
          {subtitle && <span>{subtitle}</span>}
        </div>
      )}
      <div className="header-spacer" />
      {trailing}
    </header>
  )
}

