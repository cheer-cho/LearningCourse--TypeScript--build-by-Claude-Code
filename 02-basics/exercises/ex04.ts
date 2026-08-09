/**
 * ex04 — Enums
 *
 * 1. Complete the numeric enum `Status` (Draft=0, Published=1, Archived=2 —
 *    numeric enums auto-increment from the first member).
 * 2. Complete the string enum `LogLevel`.
 * 3. Implement `statusLabel` with a switch over ALL Status members.
 *
 * Check: npm test -- 02 -t ex04
 */

// TODO: add Published and Archived.
export enum Status {
  Draft,
}

// TODO: add Info = 'INFO' and Error = 'ERROR'.
export enum LogLevel {
  Debug = 'DEBUG',
}

// Return 'draft' | 'published' | 'archived' for the matching status.
export function statusLabel(status: Status): string {
  throw new Error('TODO: implement statusLabel')
}
