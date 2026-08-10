/**
 * ex03 — `pipe`: function composition typed end to end
 *
 * pipe(f, g, h) returns a function that runs f, feeds its result to g,
 * then to h. Overloads make the whole chain type-check: each function's
 * input must equal the previous function's output, and the result type
 * flows from the FIRST input to the LAST output.
 *
 * 1. Write four overload signatures (1, 2, 3 and 4 functions):
 *      pipe<A, B>(ab): (a: A) => B
 *      pipe<A, B, C>(ab, bc): (a: A) => C
 *      ...and so on up to <A, B, C, D, E>.
 * 2. The implementation signature underneath stays loose
 *    (rest array of (x: any) => any) and reduces over the functions.
 *
 *    const p = pipe((s: string) => s.length, (n: number) => n * 2)
 *    p('abcd') -> 8            typeof p: (a: string) => number
 *
 * Check: npm test -- 11 -t ex03
 */

// TODO: add the overload signatures above the implementation, then
// implement with reduce.
export function pipe(...fns: Array<(x: any) => any>): any {
  throw new Error('TODO: implement pipe')
}
