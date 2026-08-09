/**
 * ex03 — Rest parameters & tuple spreads
 *
 * 1. sumOf: any number of numbers.
 * 2. buildPath: a base followed by any number of string segments,
 *    joined with '/'.  buildPath('api', 'users', '42') -> 'api/users/42'
 * 3. callWith: takes a two-arg function and its arguments AS A TUPLE,
 *    and calls it (spread the tuple into the call).
 *
 * Check: npm test -- 04 -t ex03
 */

// TODO: rest parameter, then implement.
export function sumOf(...nums: any): number {
  throw new Error('TODO: implement sumOf')
}

// TODO: base + rest segments, then implement.
export function buildPath(base: any, ...segments: any): string {
  throw new Error('TODO: implement buildPath')
}

// TODO: fix the types:
//   fn:   (a: number, b: string) => string
//   args: [number, string]
// then implement by SPREADING args into fn.
export function callWith(fn: any, args: any): string {
  throw new Error('TODO: implement callWith')
}
