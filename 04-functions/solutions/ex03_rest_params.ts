// Reference solution — ex03

export function sumOf(...nums: number[]): number {
  return nums.reduce((sum, n) => sum + n, 0)
}

export function buildPath(base: string, ...segments: string[]): string {
  return [base, ...segments].join('/')
}

export function callWith(fn: (a: number, b: string) => string, args: [number, string]): string {
  return fn(...args)
}
