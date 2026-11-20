// Reference solution — ex03

export function pipe<A, B>(ab: (a: A) => B): (a: A) => B
export function pipe<A, B, C>(ab: (a: A) => B, bc: (b: B) => C): (a: A) => C
export function pipe<A, B, C, D>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): (a: A) => D
export function pipe<A, B, C, D, E>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
): (a: A) => E
export function pipe(...fns: Array<(x: any) => any>): (x: any) => any {
  return (x) => fns.reduce((acc, fn) => fn(acc), x)
}
