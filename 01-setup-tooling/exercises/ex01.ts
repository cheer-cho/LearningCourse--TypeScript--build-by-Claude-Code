/**
 * ex01 — Your first annotations
 *
 * The functions below already WORK at runtime — but they are typed with
 * `any`, so TypeScript checks nothing. Your job: replace every `any` with
 * the correct type. Do NOT change the function bodies.
 *
 * When you're done, TypeScript should be able to reject calls like
 * add('2', 3) at compile time.
 *
 * Check: npm test -- 01 -t ex01
 */

// TODO: annotate both parameters (the return type can be inferred — but
// try writing it explicitly once to see what it looks like).
export function add(a: number, b: number) {
  return a + b
}

// TODO: annotate the parameter.
export function shout(word: string) {
  return word.toUpperCase() + '!'
}

// TODO: annotate both parameters.
export function repeat(word: string, times: number) {
  return Array(times).fill(word).join(' ')
}

// TODO: annotate both parameters. What should this return?
export function isLong(word: string, minLength: number): boolean {
  return word.length >= minLength
}
