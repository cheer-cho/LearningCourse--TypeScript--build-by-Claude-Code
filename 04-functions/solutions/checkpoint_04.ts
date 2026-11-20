// Reference solution — checkpoint 4

export function pad(text: string, width: number, char = ' '): string {
  return text.length >= width ? text : char.repeat(width - text.length) + text
}

export function joinWith(separator: string, ...parts: string[]): string {
  return parts.join(separator)
}

export function firstOf(x: string): string
export function firstOf(x: number[]): number | undefined
export function firstOf(x: string | number[]): string | number | undefined {
  if (typeof x === 'string') return x.charAt(0)
  return x[0]
}

export function once(fn: () => void): () => void {
  let called = false
  return () => {
    if (called) return
    called = true
    fn()
  }
}
