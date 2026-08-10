/**
 * ex03 — Distributive conditionals & disabling distribution
 *
 * A conditional type distributes over a UNION when the checked type is
 * a bare type parameter: `T extends U ? X : Y` runs once per union
 * member and unions the results. Wrapping both sides in a tuple
 * (`[T] extends [U]`) tests the union as a single whole instead.
 *
 * 1. ToArrayEach<T>: distributive — wraps EACH union member separately.
 *      ToArrayEach<string | number> -> string[] | number[]
 * 2. ToArrayWhole<T>: non-distributive version of the same idea.
 *      ToArrayWhole<string | number> -> (string | number)[]
 * 3. FilterString<T>: distributive filter — keep only string members.
 *      FilterString<'a' | 42 | 'b'> -> 'a' | 'b'
 * 4. IsUnion<T>: true if T has more than one member, else false.
 *    Hint (classic trick): compare T against a second type parameter
 *    that defaults to T, distributively.
 *
 * Check: npm test -- 08 -t ex03
 */

// TODO
export type ToArrayEach<T> = unknown

// TODO
export type ToArrayWhole<T> = unknown

// TODO
export type FilterString<T> = unknown

// TODO
export type IsUnion<T, U = T> = unknown
