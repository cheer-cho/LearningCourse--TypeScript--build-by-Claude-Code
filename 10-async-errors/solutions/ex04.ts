// Reference solution — ex04

export function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message
  if (typeof e === 'string') return e
  if (typeof e === 'object' && e !== null && 'message' in e && typeof e.message === 'string') {
    return e.message
  }
  return String(e)
}

export async function describeFailure(fn: () => Promise<unknown>): Promise<string> {
  try {
    await fn()
    return 'ok'
  } catch (e) {
    // e is `unknown` here — useUnknownInCatchVariables is on.
    return getErrorMessage(e)
  }
}
