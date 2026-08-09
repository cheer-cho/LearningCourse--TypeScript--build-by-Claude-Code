/**
 * ex02 — Living with strictNullChecks
 *
 * This repo enables strictNullChecks and noUncheckedIndexedAccess.
 * That means:
 *   - `null` / `undefined` are NOT assignable to other types
 *   - `items[i]` is typed `T | undefined` — the compiler assumes any
 *     index might miss
 *
 * Implement the three functions. The signatures are already correct —
 * make the bodies satisfy them. Notice how the compiler FORCES you to
 * handle the missing cases.
 *
 * Check: npm test -- 01 -t ex02
 */

// Return the first item, or `fallback` if the array is empty.
// Hint: items[0] has type `string | undefined` here. Handle it.
export function firstOrDefault(items: string[], fallback: string): string {
  throw new Error('TODO: implement firstOrDefault')
}

// Return the length of the text, or 0 for null/undefined.
export function lengthOf(text: string | null | undefined): number {
  throw new Error('TODO: implement lengthOf')
}

// Return the item at `index`. The return type says `| undefined` —
// out-of-range lookups are allowed, and the caller must deal with it.
export function itemAt(items: number[], index: number): number | undefined {
  throw new Error('TODO: implement itemAt')
}
