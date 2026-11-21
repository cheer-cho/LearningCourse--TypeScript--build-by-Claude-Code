/**
 * ex05 — Custom error classes, instanceof, and cause
 *
 * Subclassing Error gives you a type you can narrow with `instanceof`
 * and extra fields the plain Error lacks. The `cause` option (ES2022)
 * chains the low-level error that triggered this one.
 *
 * 1. HttpError:
 *      - readonly status: number, readonly url: string
 *      - message must be `HTTP ${status} for ${url}`
 *      - name must be 'HttpError'
 *      - optional third constructor arg cause (unknown) — forward it
 *        with super(message, { cause })
 * 2. isHttpError: a TYPE PREDICATE (`e is HttpError`) so a positive
 *    check narrows `unknown` down to HttpError.
 * 3. messageChain: walk e, e.cause, e.cause.cause ... collecting each
 *    Error's message; stop at the first non-Error. A non-Error input
 *    gives [].
 *      messageChain(new HttpError(500, '/r', new Error('db down')))
 *        -> ['HTTP 500 for /r', 'db down']
 *
 * Check: npm test -- 10 -t ex05
 */

export class HttpError extends Error {
  // TODO: make these readonly number / readonly string.
  readonly status: any
  readonly url: any

  // TODO: type the parameters, build the message, forward the cause,
  // set the name.
  constructor(status: any, url: any, cause?: any) {
    super('TODO: build the message')
    this.status = status
    this.url = url
  }
}

// TODO: turn this into a type predicate on HttpError.
export function isHttpError(e: any): any {
  throw new Error('TODO: implement isHttpError')
}

// TODO: parameter unknown, return string[]. Walk the cause chain.
export function messageChain(e: any): any {
  throw new Error('TODO: implement messageChain')
}
