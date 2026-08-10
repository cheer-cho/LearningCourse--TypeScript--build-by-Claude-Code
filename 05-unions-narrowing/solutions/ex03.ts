// Reference solution — ex03

export function padLeft(value: string, padding: string | number): string {
  if (typeof padding === 'number') {
    return ' '.repeat(padding) + value
  }
  return padding + value
}

export function toLines(input: string | string[] | null): string[] {
  if (input === null) return []
  if (typeof input === 'string') return [input]
  return input
}

export function concatIfBothStrings(x: string | number, y: string | boolean): string {
  if (x === y) {
    // both narrowed to string — the only overlapping type
    return x.toUpperCase() + y.toUpperCase()
  }
  return `${x}/${y}`
}
