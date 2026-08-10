import { describe, expect, expectTypeOf, it } from 'vitest'
import { describeTheme, recordAction } from './ex01'
import type { AuditEntry, AuditLevel } from './ex01-audit'
import type { Prefs } from './ex01-prefs'

describe('ex09/ex01 — type-only imports', () => {
  it('recordAction builds a precisely typed entry', () => {
    expect(recordAction('save', 'write')).toEqual({ action: 'save', level: 'write' })
    expectTypeOf(recordAction).toEqualTypeOf<(action: string, level: AuditLevel) => AuditEntry>()
  })

  it('describeTheme falls back to the default theme', () => {
    expect(describeTheme({ fontSize: 14 })).toBe('light @ 14px')
    expect(describeTheme({ theme: 'dark', fontSize: 16 })).toBe('dark @ 16px')
    expectTypeOf(describeTheme).toEqualTypeOf<(prefs: Prefs) => string>()
  })

  it('ex01-audit is never loaded at runtime (types only!)', () => {
    // A plain `import { ... }` of ex01-audit runs its side effect;
    // `import type` erases the import so the footprint never appears.
    expect((globalThis as { __ex01AuditLoaded?: boolean }).__ex01AuditLoaded).toBeUndefined()
  })
})
