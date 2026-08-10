/**
 * ex01 — Promise<T>, async return types, and Awaited<T>
 *
 * An async function ALWAYS returns a Promise — you return the plain
 * value, TypeScript wraps it. `Awaited<T>` goes the other way: it
 * unwraps Promise layers (all of them, however deep).
 *
 * 1. fetchUser: async, takes a numeric id, resolves to a User where
 *    name is `user-${id}`. Annotate the return type as Promise<User>.
 *      await fetchUser(7) -> { id: 7, name: 'user-7' }
 * 2. double: async, takes a number, resolves to n * 2. Do NOT annotate
 *    the return type — check what TS infers (it's still a Promise!).
 * 3. FetchedUser: the resolved type of fetchUser, derived with
 *    Awaited + ReturnType (don't just write User).
 * 4. Flattened: use Awaited on the Nested alias below — it should
 *    unwrap BOTH promise layers at once.
 *
 * Check: npm test -- 10 -t ex01
 */

export interface User {
  id: number
  name: string
}

export type Nested = Promise<Promise<{ ok: boolean }>>

// TODO: type the parameter and the Promise<User> return, then implement.
export async function fetchUser(id: any): Promise<any> {
  throw new Error('TODO: implement fetchUser')
}

// TODO: type the parameter, then implement (no return annotation needed).
export async function double(n: any) {
  throw new Error('TODO: implement double')
}

// TODO: derive from fetchUser with Awaited + ReturnType.
export type FetchedUser = unknown

// TODO: unwrap Nested with Awaited.
export type Flattened = unknown
