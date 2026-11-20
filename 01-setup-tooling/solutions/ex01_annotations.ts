// Reference solution — ex01

export function add(a: number, b: number): number {
  return a + b
}

export function shout(word: string) {
  return word.toUpperCase() + '!'
}

export function repeat(word: string, times: number) {
  return Array(times).fill(word).join(' ')
}

export function isLong(word: string, minLength: number) {
  return word.length >= minLength
}
