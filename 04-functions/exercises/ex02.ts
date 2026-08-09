/**
 * ex02 — Optional and default parameters
 *
 * 1. greet: greeting defaults to 'Hello'.
 *      greet('Ada')          -> 'Hello, Ada!'
 *      greet('Ada', 'Yo')    -> 'Yo, Ada!'
 * 2. range: with one argument, counts 0..start-1; with two, start..end-1.
 *      range(3)      -> [0, 1, 2]
 *      range(2, 5)   -> [2, 3, 4]
 *    Use an OPTIONAL parameter (not a default) — inside the body its
 *    type is `number | undefined`; branch on it.
 *
 * Check: npm test -- 04 -t ex02
 */

// TODO: give greeting a default value instead of any.
export function greet(name: string, greeting: any): string {
  return `${greeting}, ${name}!`
}

// TODO: make `end` optional, then implement both behaviors.
export function range(start: number, end: any): number[] {
  throw new Error('TODO: implement range')
}
