/**
 * ex01 — Function types
 *
 * A function type describes the shape of a function VALUE:
 * parameters and return.
 *
 * 1. Define BinaryOp: takes two numbers, returns a number.
 * 2. Type `add` and `multiply` as BinaryOp — note how their parameters
 *    no longer need annotations (contextual typing).
 * 3. Implement applyOp.
 *
 * Check: npm test -- 04 -t ex01
 */

// TODO: (a: number, b: number) => number
export type BinaryOp = unknown

// TODO: annotate with BinaryOp (and remove the `any`s).
export const add = (a: any, b: any) => a + b

// TODO: annotate with BinaryOp.
export const multiply = (a: any, b: any) => a * b

// TODO: fix the types, then implement: apply `op` to a and b.
export function applyOp(a: any, b: any, op: any): any {
  throw new Error('TODO: implement applyOp')
}
