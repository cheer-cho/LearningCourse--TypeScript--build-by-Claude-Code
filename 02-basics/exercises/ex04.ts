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
  Published,
  Archived
}

// TODO: add Info = 'INFO' and Error = 'ERROR'.
export enum LogLevel {
  Debug = 'DEBUG',
  Info = 'INFO',
  Error = 'ERROR'
}

// Return 'draft' | 'published' | 'archived' for the matching status.
export function statusLabel(status: Status): 'draft' | 'published' | 'archived' {
  switch (status) {
    case Status.Draft:
      return 'draft';
    case Status.Archived:
      return 'archived';
    case Status.Published:
      return 'published'
  }
}
