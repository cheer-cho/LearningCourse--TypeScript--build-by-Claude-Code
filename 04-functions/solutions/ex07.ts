// Reference solution — ex07

export function makeAdder(x: number): (y: number) => number {
  return (y) => x + y
}

export function twice(fn: (n: number) => number): (n: number) => number {
  return (n) => fn(fn(n))
}

export function pipeline2(f: (n: number) => string, g: (s: string) => boolean): (n: number) => boolean {
  return (n) => g(f(n))
}
