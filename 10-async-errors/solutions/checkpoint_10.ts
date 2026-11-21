// Reference solution — checkpoint 10

export class TimeoutError extends Error {
  constructor(readonly ms: number) {
    super(`timed out after ${ms}ms`)
    this.name = 'TimeoutError'
  }
}

export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const timeout = new Promise<never>((_resolve, reject) => {
    timer = setTimeout(() => reject(new TimeoutError(ms)), ms)
  })
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer))
}

export type Ok<T> = { ok: true; value: T }

export type Err<E> = { ok: false; error: E }

export type Result<T, E> = Ok<T> | Err<E>

export function ok<T>(value: T): Ok<T> {
  return { ok: true, value }
}

export function err<E>(error: E): Err<E> {
  return { ok: false, error }
}

export async function fetchResilient<T>(
  fn: () => Promise<T>,
  options: { attempts: number; timeoutMs: number },
): Promise<Result<T, Error>> {
  let lastError: unknown
  for (let i = 0; i < options.attempts; i += 1) {
    try {
      const value = await withTimeout(fn(), options.timeoutMs)
      return ok(value)
    } catch (e) {
      lastError = e
    }
  }
  return err(lastError instanceof Error ? lastError : new Error(String(lastError)))
}

export function describeResult<T>(result: Result<T, Error>): string {
  return result.ok ? `success: ${JSON.stringify(result.value)}` : `failure: ${result.error.message}`
}
