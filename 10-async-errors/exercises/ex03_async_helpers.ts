/**
 * ex03 — Typed async helpers: delay, withTimeout, retry
 *
 * Three helpers every codebase reinvents. The typing lesson: generics
 * flow THROUGH promises, and a promise that can only reject is typed
 * Promise<never> so it disappears from a Promise.race result.
 *
 * 1. delay(ms): resolves (with nothing) after ms milliseconds.
 * 2. withTimeout(promise, ms): resolves/rejects with `promise` if it
 *    settles within ms, otherwise rejects with
 *      new Error(`timed out after ${ms}ms`)
 *    Hint: Promise.race the input against a rejecting Promise<never> —
 *    that keeps the result typed Promise<T>.
 * 3. retry(fn, attempts): call fn() up to `attempts` times, resolving
 *    with the first success; if every attempt rejects, rethrow the
 *    LAST error.
 *
 * Check: npm test -- 10 -t ex03
 */

// TODO: type the parameter and return, then implement with setTimeout.
export function delay(ms: any): any {
  throw new Error('TODO: implement delay')
}

// TODO: make this generic in T, then implement with Promise.race.
export function withTimeout(promise: any, ms: any): any {
  throw new Error('TODO: implement withTimeout')
}

// TODO: make this generic in T, then implement.
export async function retry(fn: any, attempts: any): Promise<any> {
  throw new Error('TODO: implement retry')
}
