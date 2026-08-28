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
export type BinaryOp = (a: number, b: number) => number

// TODO: annotate with BinaryOp (and remove the `any`s).
export const add: BinaryOp = (a, b) => a + b

// TODO: annotate with BinaryOp.
export const multiply: BinaryOp = (a, b) => a * b

export type ApplyOp = (a: number, b: number, op: BinaryOp) => number

// TODO: fix the types, then implement: apply `op` to a and b.
export const applyOp: ApplyOp = (a, b, op) => op(a, b)

// This is the same function as applyOp, but using function declaration
// type ApplyOp will probably be not reused, so this should be a better one.
export function applyOp2 (a: number, b: number, op: BinaryOp) {
  return op(a, b)
}
