/**
 * ex08 — Recursive types
 *
 * A type alias may refer to itself; the compiler unwinds it lazily as
 * needed. This is how you describe data whose depth isn't known ahead
 * of time — JSON, trees, nested paths.
 *
 * 1. Json: any valid JSON value (a recursive union — primitives,
 *    arrays of Json, or a string-keyed object of Json). Functions and
 *    other non-JSON values must NOT be assignable to it.
 * 2. DeepReadonly<T>: readonly, recursively — every nested object
 *    property AND every nested array becomes readonly too.
 * 3. Split<S, D>: split a string literal S on delimiter D into a tuple
 *    of the pieces.
 *      Split<'a.b.c', '.'> -> ['a', 'b', 'c']
 *      Split<'a', '.'>     -> ['a']
 *
 * Check: npm test -- 08 -t ex08
 */

// TODO
export type Json = unknown

// TODO
export type DeepReadonly<T> = unknown

// TODO
export type Split<S extends string, D extends string> = unknown
