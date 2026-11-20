// Reference solution — ex01

export type BinaryOp = (a: number, b: number) => number

export const add: BinaryOp = (a, b) => a + b

export const multiply: BinaryOp = (a, b) => a * b

export function applyOp(a: number, b: number, op: BinaryOp): number {
  return op(a, b)
}
