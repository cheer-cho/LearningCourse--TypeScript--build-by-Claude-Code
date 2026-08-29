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
export function sumOf (...nums: number[]): number {
  return nums.reduce((acc, cur) => acc + cur, 0)
}

// TODO: base + rest segments, then implement.
export function buildPath (base: string, ...segments: string[]): string {
  // const path = segments.length > 0 ? `/${segments.join('/')}` : ''
  // return `${base}${path}`
  return [base, ...segments].join('/')
}

// TODO: fix the types:
//   fn:   (a: number, b: string) => string
//   args: [number, string]
// then implement by SPREADING args into fn.
export function callWith (
  fn: (a: number, b: string) => string,
  args: [number, string]
): string {
  return fn(...args)
}
