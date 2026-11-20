/**
 * ✦ CAPSTONE C — Type-level puzzle library
 *
 * A project, not a drill: a small reusable library of type-level
 * utilities, each harder than the ones you've built so far. There is no
 * `checkpoint.ts` for this module — this file IS the graded work. Every
 * puzzle here recombines ideas from:
 *   - 05 narrowing & conditional types
 *   - 07 generics & constraints
 *   - 11 recursive template-literal & mapped types
 *
 * Most of these are pure type-level puzzles (tested with expectTypeOf
 * only). A few have a natural RUNTIME twin — getByPath, zip, flatten —
 * so those also get plain `expect` smoke tests.
 *
 * GOALS (11 utilities)
 *   1. Split<S, D>       — split a string literal on a delimiter into a
 *                          tuple of substrings.
 *   2. Join<T, D>        — the inverse: join a tuple of strings with D.
 *   3. CamelCase<S>      — snake_case / kebab-case -> camelCase.
 *   4. ObjectPaths<T>    — union of every dot-path into a nested object,
 *                          including intermediate paths.
 *   5. GetByPath<T,P>    — type-level lookup by dot path (+ `getByPath`
 *                          runtime twin).
 *   6. UnionToIntersection<U> — turn a union into an intersection.
 *   7. IsNever<T>        — true/false, is T exactly `never`?
 *   8. Zip<A, B>         — pair up two tuples element-wise, stopping at
 *                          the shorter one (+ `zip` runtime twin).
 *   9. Flatten<T>        — fully flatten a nested tuple type, arbitrarily
 *                          deep (+ `flatten` runtime twin).
 *  10. RequiredKeys<T>   — union of T's non-optional keys.
 *  11. OptionalKeys<T>   — union of T's optional keys.
 *
 * ACCEPTANCE CRITERIA — see the test file. Every type-level assertion
 * there is written to FAIL against the `unknown` stubs below and PASS
 * once you implement the real conditional/mapped/template-literal type.
 *
 * Check: npm test -- 13 -t capstone-c
 */

// ---------- Split / Join ----------

// TODO: recursively split S on delimiter D into a tuple.
//   Split<'a.b.c', '.'> -> ['a', 'b', 'c']
//   Split<'a', '.'>     -> ['a']
export type Split<S extends string, D extends string> = unknown

// TODO: the inverse of Split — join a tuple of strings with D.
//   Join<['a', 'b', 'c'], '.'> -> 'a.b.c'
//   Join<['a'], '.'>           -> 'a'
//   Join<[], '.'>              -> ''
export type Join<T extends readonly string[], D extends string> = unknown

// ---------- CamelCase ----------

// TODO: convert every `_` or `-` separated segment into camelCase.
//   CamelCase<'hello_world'>   -> 'helloWorld'
//   CamelCase<'foo-bar-baz'>   -> 'fooBarBaz'
//   CamelCase<'already'>       -> 'already'
export type CamelCase<S extends string> = unknown

// ---------- ObjectPaths / GetByPath ----------

// TODO: union of every dot-path into T, INCLUDING intermediate paths.
//   ObjectPaths<{ a: { b: { c: number } }; d: string }>
//     -> 'a' | 'a.b' | 'a.b.c' | 'd'
export type ObjectPaths<T> = unknown

// TODO: type-level lookup by dot path.
//   GetByPath<{ a: { b: { c: number } } }, 'a.b.c'> -> number
export type GetByPath<T, Path extends string> = unknown

// TODO: runtime twin — walk `obj` by the dot-separated `path`, typed by
// GetByPath. Use `noUncheckedIndexedAccess`-safe property checks.
export function getByPath(obj: any, path: any): any {
  throw new Error('TODO: implement getByPath')
}

// ---------- UnionToIntersection ----------

// TODO: turn a union type into an intersection type.
//   UnionToIntersection<{ a: 1 } | { b: 2 }> -> { a: 1 } & { b: 2 }
// Hint: distribute U into a union of `(x: U) => void` functions, then
// infer from the CONTRAVARIANT position — overload resolution collapses
// a union of function parameter types into an intersection.
export type UnionToIntersection<U> = unknown

// ---------- IsNever ----------

// TODO: true if T is exactly `never`, else false. Wrap T in a tuple so
// `never` itself doesn't vanish via distributive conditional types.
export type IsNever<T> = unknown

// ---------- Zip ----------

// TODO: pair up A and B element-wise; stop at the SHORTER tuple.
//   Zip<[1, 2, 3], ['a', 'b', 'c']> -> [[1, 'a'], [2, 'b'], [3, 'c']]
//   Zip<[1, 2], ['a', 'b', 'c']>    -> [[1, 'a'], [2, 'b']]
export type Zip<A extends readonly unknown[], B extends readonly unknown[]> = unknown

// TODO: runtime twin of Zip, typed generically.
export function zip(a: any, b: any): any {
  throw new Error('TODO: implement zip')
}

// ---------- Flatten ----------

// TODO: fully flatten an arbitrarily-nested tuple type, one level or
// many, into a single flat tuple.
//   Flatten<[1, [2, 3], [4, [5, 6]]]> -> [1, 2, 3, 4, 5, 6]
export type Flatten<T extends readonly unknown[]> = unknown

// TODO: runtime twin of Flatten (deep flatten of a nested array).
export function flatten(arr: any): any {
  throw new Error('TODO: implement flatten')
}

// ---------- RequiredKeys / OptionalKeys ----------

// TODO: union of T's keys that are NOT optional.
export type RequiredKeys<T> = unknown

// TODO: union of T's keys that ARE optional.
export type OptionalKeys<T> = unknown
