/**
 * ✦ CHECKPOINT 10 — Async & Error Handling
 *
 * A resilient fetch pipeline. Combines: custom error classes (ex05),
 * withTimeout (ex03), retrying failed attempts, and the Result pattern
 * (ex06) so the pipeline never throws — callers get a typed outcome.
 * Each declaration below explains its own job.
 *
 * Passing `npm test -- 10` completes this module. 🎉
 */

// A custom Error subclass for timeouts.
//   - readonly ms: number
//   - message must be `timed out after ${ms}ms`
//   - name must be 'TimeoutError'
export class TimeoutError extends Error {
  readonly ms: any

  // TODO: type the parameter, build the message, set the name.
  constructor(ms: any) {
    super('TODO: build the message')
    this.ms = ms
  }
}

// Resolve/reject with `promise` if it settles within `ms` milliseconds;
// otherwise reject with a TimeoutError(ms). Generic in T.
//   Signature: (promise: Promise<T>, ms: number) => Promise<T>
// Hint: Promise.race against a rejecting Promise<never>, like ex03 —
// but reject with `new TimeoutError(ms)` instead of a plain Error.
export function withTimeout(promise: any, ms: any): any {
  throw new Error('TODO: implement withTimeout')
}

// The success case: { ok: true; value: T }
export type Ok<T> = unknown

// The failure case: { ok: false; error: E }
export type Err<E> = unknown

// Already correct once Ok and Err are.
export type Result<T, E> = Ok<T> | Err<E>

// Build the success case — generic: ok(value) builds an Ok<T>.
export function ok(value: any): any {
  throw new Error('TODO: implement ok')
}

// Build the failure case — generic: err(error) builds an Err<E>.
export function err(error: any): any {
  throw new Error('TODO: implement err')
}

// The pipeline. Call fn(), wrapped in withTimeout(., timeoutMs), up to
// `attempts` times. Resolve with ok(value) on the FIRST success. If
// every attempt fails — throws OR times out — resolve with
// err(lastError), normalizing any non-Error throw to
// `new Error(String(e))`.
// fetchResilient must NEVER reject — every outcome is a Result.
//   Signature: <T>(fn: () => Promise<T>,
//                  options: { attempts: number; timeoutMs: number })
//                => Promise<Result<T, Error>>
export async function fetchResilient(fn: any, options: any): Promise<any> {
  throw new Error('TODO: implement fetchResilient')
}

// Format a Result<T, Error> for humans — narrow on .ok first.
//   ok  -> `success: ${JSON.stringify(value)}`
//   err -> `failure: ${error.message}`
export function describeResult(result: any): any {
  throw new Error('TODO: implement describeResult')
}
