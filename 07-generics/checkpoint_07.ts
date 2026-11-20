/**
 * ✦ CHECKPOINT 7 — Generics
 *
 * A tiny typed data layer. Combines: generic type aliases with defaults,
 * generic functions over readonly arrays, constraints with extends and
 * keyof, and a generic class. Each declaration below explains its own job.
 *
 * Passing `npm test -- 07` completes this module. 🎉
 */

// An operation that either succeeded with a value or failed with an
// error. E defaults to string.
//   Result<T, E = string> = { ok: true; value: T } | { ok: false; error: E }
export type Result<T, E = string> = unknown

// Build the success case.
//   ok<T>(value): Result<T, never>       ok(42) -> { ok: true, value: 42 }
export function ok(value: any): any {
  throw new Error('TODO: implement ok')
}

// Build the failure case.
//   err<E>(error): Result<never, E>      err('x') -> { ok: false, error: 'x' }
export function err(error: any): any {
  throw new Error('TODO: implement err')
}

// The first element matching `pred`, as an ok-Result — or err('not
// found') when nothing matches. Generic in T; takes a READONLY array.
//   firstWhere([1, 2, 3], n => n > 1) -> ok(2)
//   Signature: (items: readonly T[], pred: (item: T) => boolean) => Result<T>
export function firstWhere(items: any, pred: any): any {
  throw new Error('TODO: implement firstWhere')
}

// A tiny typed store. Constrain T so every item has a numeric id:
//   Store<T extends { id: number }>
// Keep the items in a private array.
//   - add(item): stores it and returns it.
//   - get(id): Result<T> — ok(item) or err('not found').
//   - getAll(): readonly T[]
//   - pluck(key): that property from every stored item (keyof
//     constraint, like ex06) — pluck('title') -> string[]
export class Store<T> {
  add(item: any): any {
    throw new Error('TODO: implement add')
  }

  get(id: any): any {
    throw new Error('TODO: implement get')
  }

  getAll(): any {
    throw new Error('TODO: implement getAll')
  }

  pluck(key: any): any {
    throw new Error('TODO: implement pluck')
  }
}
