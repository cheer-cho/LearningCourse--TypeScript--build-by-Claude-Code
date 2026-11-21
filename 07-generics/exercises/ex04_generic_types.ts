/**
 * ex04 — Generic type aliases & interfaces
 *
 * Types can take parameters too. `Box<T>` is not a type — it's a type
 * FACTORY: `Box<number>` and `Box<string>` are the types.
 *
 * 1. Box<T>: an object with a single `value: T` property.
 * 2. boxOf<T>(value): wraps a value in a Box (inferring T).
 * 3. Result<T, E>: the classic success-or-failure union —
 *      { ok: true; value: T } | { ok: false; error: E }
 * 4. safeDivide(a, b): Result<number, string>. Division by zero returns
 *    an error result with the message 'division by zero'.
 * 5. unwrapOr<T, E>(result, fallback): the value when ok, else fallback.
 *
 * Check: npm test -- 07 -t ex04
 */

// TODO: give Box a type parameter and the value property.
export type Box<T> = unknown

// TODO: infer T from the argument, return Box<T>.
export function boxOf(value: any): any {
  throw new Error('TODO: implement boxOf')
}

// TODO: the two-armed union described above.
export type Result<T, E> = unknown

// TODO: return type Result<number, string>, then implement.
export function safeDivide(a: number, b: number): any {
  throw new Error('TODO: implement safeDivide')
}

// TODO: two type parameters; narrow on result.ok.
export function unwrapOr(result: any, fallback: any): any {
  throw new Error('TODO: implement unwrapOr')
}
