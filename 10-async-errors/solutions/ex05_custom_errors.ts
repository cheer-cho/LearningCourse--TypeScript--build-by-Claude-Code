// Reference solution — ex05

export class HttpError extends Error {
  constructor(
    readonly status: number,
    readonly url: string,
    cause?: unknown,
  ) {
    super(`HTTP ${status} for ${url}`, { cause })
    this.name = 'HttpError'
  }
}

export function isHttpError(e: unknown): e is HttpError {
  return e instanceof HttpError
}

export function messageChain(e: unknown): string[] {
  const messages: string[] = []
  let current: unknown = e
  while (current instanceof Error) {
    messages.push(current.message)
    current = current.cause
  }
  return messages
}
