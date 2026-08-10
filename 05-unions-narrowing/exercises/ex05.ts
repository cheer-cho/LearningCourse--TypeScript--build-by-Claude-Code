/**
 * ex05 — Discriminated unions: modeling request states
 *
 * Give every variant the SAME literal tag field (here: `status`).
 * Checking the tag then narrows to exactly one variant — this is THE
 * pattern for modeling app state.
 *
 * 1. Define RequestState as the union of exactly these four variants:
 *      { status: 'idle' }
 *      { status: 'loading'; startedAt: number }
 *      { status: 'success'; data: string }
 *      { status: 'error'; message: string }
 * 2. describeState(state):
 *      idle    -> 'idle'
 *      loading -> 'loading since <startedAt>'
 *      success -> 'got: <data>'
 *      error   -> 'error: <message>'
 *    Switch on state.status — each case sees only its variant's fields.
 * 3. dataOrDefault(state, fallback): the data if status is 'success',
 *    otherwise the fallback.
 *
 * Check: npm test -- 05 -t ex05
 */

// TODO: the four-variant discriminated union described above.
export type RequestState = unknown

// TODO: type the parameter (RequestState) and return, then implement.
export function describeState(state: any): any {
  throw new Error('TODO: implement describeState')
}

// TODO: type the parameters (RequestState, string) and return, then
// implement.
export function dataOrDefault(state: any, fallback: any): any {
  throw new Error('TODO: implement dataOrDefault')
}
