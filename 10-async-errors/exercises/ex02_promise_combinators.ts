/**
 * ex02 — Promise.all tuple inference & Promise.allSettled narrowing
 *
 * `Promise.all` on a tuple of promises infers a TUPLE of results —
 * each position keeps its own type. `Promise.allSettled` never rejects;
 * it resolves to a discriminated union you narrow by `status`.
 *
 * 1. loadProfile: run the three sources below CONCURRENTLY with
 *    Promise.all and return the tuple of their results. Annotate the
 *    return type as Promise<[number, string, boolean]>.
 * 2. partition: await ALL of the given promises with Promise.allSettled
 *    (even if some reject), then split the results:
 *      - values: the fulfilled values, in order
 *      - errors: String(reason) for each rejection, in order
 *    You must narrow each result by its `status` — `.value` and
 *    `.reason` only exist after the check.
 *      partition([Promise.resolve(1), Promise.reject(new Error('x'))])
 *        -> { values: [1], errors: ['Error: x'] }
 *
 * Check: npm test -- 10 -t ex02
 */

export async function getCount(): Promise<number> {
  return 42
}

export async function getName(): Promise<string> {
  return 'Ada'
}

export async function getFlag(): Promise<boolean> {
  return true
}

// TODO: Promise.all over [getCount(), getName(), getFlag()].
export async function loadProfile(): Promise<any> {
  throw new Error('TODO: implement loadProfile')
}

// TODO: type the parameter and return, then implement with allSettled.
export async function partition(promises: any): Promise<any> {
  throw new Error('TODO: implement partition')
}
