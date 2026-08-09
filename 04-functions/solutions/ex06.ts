// Reference solution — ex06

export function forEachNumber(items: number[], visit: (n: number) => void): void {
  for (const item of items) visit(item)
}

export function collectDoubles(items: number[]): number[] {
  const doubles: number[] = []
  // push returns number — allowed, because the callback type is void.
  forEachNumber(items, (n) => doubles.push(n * 2))
  return doubles
}

export const quiz: { q1: 'yes' | 'no'; q2: 'yes' | 'no' } = {
  q1: 'yes', // a void-TYPED callback may return anything (ignored)
  q2: 'no', // a declared `: void` body may not `return 42`
}
