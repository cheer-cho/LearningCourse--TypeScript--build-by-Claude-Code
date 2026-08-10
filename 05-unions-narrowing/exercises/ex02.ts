/**
 * ex02 — Intersection types: all shapes at once
 *
 * `A & B` says a value satisfies A AND B simultaneously. Great for
 * composing object types; strange for primitives (they collapse).
 *
 * 1. Define Entity as the intersection of Identified and Serializable.
 * 2. Define Overlap as ('a' | 'b') & ('b' | 'c') — what does it reduce
 *    to? (Intersection distributes over union.)
 * 3. Define Impossible as string & number — what does THAT reduce to?
 * 4. Implement makeEntity(id, payload): returns an Entity whose
 *    serialize() produces `${id}:${payload}`.
 *      makeEntity(7, 'hello').serialize() -> '7:hello'
 *
 * Check: npm test -- 05 -t ex02
 */

// Given — do not change.
export type Identified = { id: number }
export type Serializable = { serialize: () => string }

// TODO: Identified & Serializable
export type Entity = unknown

// TODO: ('a' | 'b') & ('b' | 'c')
export type Overlap = unknown

// TODO: string & number
export type Impossible = unknown

// TODO: type the parameters (number, string) and return (Entity),
// then implement.
export function makeEntity(id: any, payload: any): any {
  throw new Error('TODO: implement makeEntity')
}
