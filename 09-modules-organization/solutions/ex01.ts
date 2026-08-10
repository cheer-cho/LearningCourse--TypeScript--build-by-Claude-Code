// Reference solution — ex01

import type { AuditEntry, AuditLevel } from './ex01-audit'
import { DEFAULT_THEME, type Prefs } from './ex01-prefs'

export function recordAction(action: string, level: AuditLevel): AuditEntry {
  return { action, level }
}

export function describeTheme(prefs: Prefs): string {
  return `${prefs.theme ?? DEFAULT_THEME} @ ${prefs.fontSize}px`
}
