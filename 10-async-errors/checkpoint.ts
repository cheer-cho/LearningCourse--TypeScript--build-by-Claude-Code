/**
 * ✦ CHECKPOINT 10 — Async & Error Handling
 *
 * A resilient fetch pipeline. Combines: custom error classes (ex05),
 * withTimeout (ex03), retrying failed attempts, and the Result pattern
 * (ex06) so the pipeline never throws — callers get a typed outcome.
 *
 * 1. TimeoutError: a custom Error subclass.
 *      - readonly ms: number
 *      - message must be `timed out after ${ms}ms`
 *      - name must be 'TimeoutError'
 * 2. withTimeout<T>(promise, ms): resolves/rejects with `promise` if it
 *    settles within ms, otherwise rejects with a TimeoutError(ms).
 *    Hint: Promise.race against a rejecting Promise<never>, like ex03 —
 *    but reject with `new TimeoutError(ms)` instead of a plain Error.
 * 3. Ok<T> / Err<E> / Result<T, E> — same shape as ex06.
 *    ok(value) / err(error) — the constructors.
 * 4. fetchResilient<T>(fn, options): options is
 *      { attempts: number; timeoutMs: number }
 *    Call fn(), wrapped in withTimeout(., timeoutMs), up to `attempts`
 *    times. Resolve with ok(value) on the FIRST success. If every
 *    attempt fails — throws OR times out — resolve with err(lastError),
 *    normalizing any non-Error throw to `new Error(String(e))`.
 *    fetchResilient must NEVER reject — every outcome is a Result.
 * 5. describeResult(result): format a Result<T, Error> as
 *      ok  -> `success: ${JSON.stringify(value)}`
 *      err -> `failure: ${error.message}`
 *
 * Passing `npm test -- 10` completes this module. 🎉
 */

// TODO: readonly ms: number, message `timed out after ${ms}ms`, name 'TimeoutError'.
export class TimeoutError extends Error {
  readonly ms: any

  // TODO: type the parameter, build the message, set the name.
  constructor(ms: any) {
    super('TODO: build the message')
    this.ms = ms
  }
}

// TODO: make this generic in T, then implement with Promise.race.
export function withTimeout(promise: any, ms: any): any {
  throw new Error('TODO: implement withTimeout')
}

// TODO: { ok: true; value: T }
export type Ok<T> = unknown

// TODO: { ok: false; error: E }
export type Err<E> = unknown

// Already correct once Ok and Err are.
export type Result<T, E> = Ok<T> | Err<E>

// TODO: make it generic — ok(value) builds an Ok<T>.
export function ok(value: any): any {
  throw new Error('TODO: implement ok')
}

// TODO: make it generic — err(error) builds an Err<E>.
export function err(error: any): any {
  throw new Error('TODO: implement err')
}

// TODO: generic in T; fix the options type; implement the retry+timeout loop.
export async function fetchResilient(fn: any, options: any): Promise<any> {
  throw new Error('TODO: implement fetchResilient')
}

// TODO: generic in T; narrow on .ok before formatting.
export function describeResult(result: any): any {
  throw new Error('TODO: implement describeResult')
}
