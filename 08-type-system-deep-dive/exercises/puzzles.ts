/**
 * puzzles — type-challenges warm-up
 *
 * Eight self-contained type puzzles, easy to hard. Each is a type-only
 * exercise: define the type alias so the type tests in puzzles.test.ts
 * pass. No runtime code needed.
 *
 * Easy:
 *   1. First<T>: the first element of tuple T, or never if T is empty.
 *   2. Length<T>: the length of tuple T as a literal number.
 *   3. TupleToUnion<T>: a union of every element type in tuple T.
 *   4. TupleToObject<T>: an object whose keys AND values are each
 *      element of T (T's elements must be usable as property keys).
 * Medium:
 *   5. Includes<T, U>: true if U appears in tuple T (exact type
 *      equality, not just assignability — string is NOT `Includes` in
 *      ['a']).
 *   6. Push<T, U>: append U to the end of tuple T.
 * Hard:
 *   7. Trim<S>: remove leading and trailing whitespace (spaces, tabs,
 *      newlines) from string literal type S.
 *   8. Replace<S, From, To>: replace the FIRST occurrence of From in S
 *      with To. If From doesn't occur, return S unchanged.
 *
 * Check: npm test -- 08 -t puzzles
 */

// TODO
export type First<T extends readonly unknown[]> = unknown

// TODO
export type Length<T extends readonly unknown[]> = unknown

// TODO
export type TupleToUnion<T extends readonly unknown[]> = unknown

// TODO
export type TupleToObject<T extends readonly (string | number | symbol)[]> = unknown

// TODO
export type Includes<T extends readonly unknown[], U> = unknown

// TODO
export type Push<T extends readonly unknown[], U> = unknown

// TODO
export type Trim<S extends string> = unknown

// TODO
export type Replace<S extends string, From extends string, To extends string> = unknown
