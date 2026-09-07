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
export type IdleState = {
  status: 'idle';
};
export type LoadingState = {
  status: 'loading';
  startedAt: number;
};
export type SuccessState = {
  status: 'success';
  data: string;
};
export type ErrorState = {
  status: 'error';
  message: string;
};
export type RequestState = IdleState | LoadingState | SuccessState | ErrorState;

function assertNever(value: never): never {
  throw new Error(`Unhandled: ${JSON.stringify(value)}`);
}

// TODO: type the parameter (RequestState) and return, then implement.
export function describeState(state: RequestState): string {
  switch (state.status) {
    case 'idle':
      return 'idle';
    case 'loading':
      return `loading since ${state.startedAt}`;
    case 'success':
      return `got: ${state.data}`;
    case 'error':
      return `error: ${state.message}`;
    default:
      return assertNever(state);
  }
}

// TODO: type the parameters (RequestState, string) and return, then
// implement.
export function dataOrDefault(state: RequestState, fallback: string): string {
  if (state.status === 'success') {
    return state.data;
  }
  // at this point state is other RequestState types that not a Success
  return fallback;
}
