// Reference solution — ex04

export type Box<T> = { value: T }

export function boxOf<T>(value: T): Box<T> {
  return { value }
}

export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E }

export function safeDivide(a: number, b: number): Result<number, string> {
  if (b === 0) return { ok: false, error: 'division by zero' }
  return { ok: true, value: a / b }
}

export function unwrapOr<T, E>(result: Result<T, E>, fallback: T): T {
  return result.ok ? result.value : fallback
}
