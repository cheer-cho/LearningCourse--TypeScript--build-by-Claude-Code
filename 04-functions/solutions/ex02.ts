// Reference solution — ex02

export function greet(name: string, greeting = 'Hello'): string {
  return `${greeting}, ${name}!`
}

export function range(start: number, end?: number): number[] {
  const [from, to] = end === undefined ? [0, start] : [start, end]
  const result: number[] = []
  for (let i = from; i < to; i++) result.push(i)
  return result
}
