/**
 * ex01 — Type-only imports (`import type`, inline `type`)
 *
 * ex01-audit exports ONLY types, yet the plain import below still loads
 * the file at runtime — and it has a side effect the tests detect!
 * `import type` is erased at compile time: the module is never loaded.
 *
 * 1. Convert the ex01-audit import to a TYPE-ONLY import.
 * 2. ex01-prefs is mixed (a value AND a type): keep ONE import statement
 *    and mark just `Prefs` with an inline `type` specifier.
 * 3. Replace the `any`s with precise types, then implement:
 *      recordAction('save', 'write') -> { action: 'save', level: 'write' }
 *      describeTheme({ fontSize: 14 }) -> 'light @ 14px'  (default theme)
 *      describeTheme({ theme: 'dark', fontSize: 16 }) -> 'dark @ 16px'
 *
 * Check: npm test -- 09 -t ex01
 */

// TODO 1: make this import type-only.
import { AuditEntry, AuditLevel } from './ex01-audit'
// TODO 2: mark Prefs with an inline `type` specifier.
import { DEFAULT_THEME, Prefs } from './ex01-prefs'

// TODO 3: precise types (string, AuditLevel -> AuditEntry), then implement.
export function recordAction(action: any, level: any): any {
  throw new Error('TODO: implement recordAction')
}

// TODO 3: precise types (Prefs -> string); DEFAULT_THEME is the fallback.
export function describeTheme(prefs: any): any {
  throw new Error('TODO: implement describeTheme')
}
