// Reference solution — ex04

export function toArray(x: string): string[]
export function toArray(x: number): number[]
export function toArray(x: string | number): string[] | number[] {
  if (typeof x === 'string') return x.split('')
  return [...String(x)].map(Number)
}

export function makeDate(iso: string): Date
export function makeDate(year: number, monthIndex: number, day: number): Date
export function makeDate(a: string | number, b?: number, c?: number): Date {
  if (typeof a === 'string') return new Date(a)
  return new Date(a, b ?? 0, c ?? 1)
}
