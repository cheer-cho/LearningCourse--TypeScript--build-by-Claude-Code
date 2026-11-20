/**
 * ex04 — Narrowing unknown errors
 *
 * In strict mode a `catch (e)` variable is `unknown` — because ANY
 * value can be thrown, not just Errors. Before you can read a message
 * you must prove there is one.
 *
 * 1. getErrorMessage: takes `unknown` (fix the parameter type!) and
 *    extracts the best message, in this order:
 *      - an Error instance          -> its .message
 *      - a string                   -> the string itself
 *      - an object whose .message
 *        property is a string       -> that message
 *      - anything else              -> String(e)
 *    Note: { message: 404 } falls to String(e) — the message must
 *    actually be a string.
 * 2. describeFailure: run the given async fn; resolve with 'ok' if it
 *    succeeds, otherwise catch and resolve with getErrorMessage of
 *    whatever was thrown. The catch variable is `unknown` — no
 *    annotation needed, strict mode does it.
 *
 * Check: npm test -- 10 -t ex04
 */

// TODO: parameter should be unknown, return string. Then narrow.
export function getErrorMessage(e: any): any {
  throw new Error('TODO: implement getErrorMessage')
}

// TODO: type fn as () => Promise<unknown>, then implement with try/catch.
export async function describeFailure(fn: any): Promise<any> {
  throw new Error('TODO: implement describeFailure')
}
