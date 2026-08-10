/**
 * ex03 — zod: validate at the boundary, derive the type
 *
 * Types are erased at runtime — they can't check anything. A zod schema
 * IS a runtime value, and the static type is derived FROM it with
 * z.infer, so validation and type can never drift apart.
 *
 * 1. UserSchema: an object schema — id (number), name (string),
 *    tags (array of strings).
 * 2. User: derive it from UserSchema with z.infer — never write the
 *    shape twice.
 * 3. parseUser: validate an unknown input with UserSchema.safeParse and
 *    convert the outcome to the given Result union. On failure the
 *    error is the FIRST issue's message (or 'invalid user' if the
 *    issue list is somehow empty — remember strict indexing).
 *
 * Check: npm test -- 12 -t ex03
 */
import { z } from 'zod'

// Given: the Result pattern — errors as values, not throws.
export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E }

// TODO: describe { id: number; name: string; tags: string[] } as a schema.
export const UserSchema = z.unknown()

// TODO: derive from UserSchema with z.infer.
export type User = unknown

// TODO: (input: unknown) => Result<User, string>, via safeParse.
export function parseUser(input: any): any {
  throw new Error('TODO: implement parseUser')
}
