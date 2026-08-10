/**
 * ✦ CHECKPOINT 7 — Generics
 *
 * A tiny typed data layer. Combines: generic type aliases with defaults,
 * generic functions over readonly arrays, constraints with extends and
 * keyof, and a generic class.
 *
 * 1. Result<T, E = string>: { ok: true; value: T } | { ok: false; error: E }
 * 2. ok(value) / err(error) constructors:
 *      ok<T>(value): Result<T, never>       ok(42)    -> { ok: true, value: 42 }
 *      err<E>(error): Result<never, E>      err('x')  -> { ok: false, error: 'x' }
 * 3. firstWhere<T>(items, pred): the first element matching pred as an
 *    ok-Result, or err('not found'). Takes a READONLY array.
 * 4. class Store<T extends { id: number }> — items must have a numeric id:
 *      - add(item): stores it and returns it
 *      - get(id): Result<T> — ok(item) or err('not found')
 *      - getAll(): readonly T[]
 *      - pluck(key): that property from every stored item (keyof
 *        constraint, like ex06) — pluck('title') -> string[]
 *
 * Passing `npm test -- 07` completes this module. 🎉
 */

// TODO: the union, with a default for E.
export type Result<T, E = string> = unknown

// TODO: fix the types, then implement.
export function ok(value: any): any {
  throw new Error('TODO: implement ok')
}

// TODO: fix the types, then implement.
export function err(error: any): any {
  throw new Error('TODO: implement err')
}

// TODO: generic, readonly array parameter, returns Result<T>.
export function firstWhere(items: any, pred: any): any {
  throw new Error('TODO: implement firstWhere')
}

// TODO: constrain T so every item has a numeric id; store items in a
// private array; fix all the method types.
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
