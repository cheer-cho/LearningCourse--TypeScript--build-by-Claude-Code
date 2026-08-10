// Helper module for ex01 — complete, DO NOT EDIT.
//
// It exports ONLY types… but it also has a top-level side effect. Any
// plain (value) import of this file runs that side effect and leaves a
// footprint on globalThis. A proper `import type` is fully erased, so
// the footprint never appears. ex01's tests check for it.

export interface AuditEntry {
  action: string
  level: AuditLevel
}

export type AuditLevel = 'read' | 'write'

// The runtime footprint. The tests assert this NEVER runs.
Object.assign(globalThis, { __ex01AuditLoaded: true })
