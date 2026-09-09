import type { ReactNode } from 'react'
import { DesktopShell } from '../desktop/DesktopShell'
import { MobileShell } from '../mobile/MobileShell'
import { useIsPhone } from '../mobile/useIsPhone'

export function AppShell({ children }: { children: ReactNode }) {
  return useIsPhone()
    ? <MobileShell>{children}</MobileShell>
    : <DesktopShell>{children}</DesktopShell>
}
