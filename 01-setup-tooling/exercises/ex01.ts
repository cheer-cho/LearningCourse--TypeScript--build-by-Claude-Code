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
export function add(a: any, b: any) {
  return a + b
}

// TODO: annotate the parameter.
export function shout(word: any) {
  return word.toUpperCase() + '!'
}

// TODO: annotate both parameters.
export function repeat(word: any, times: any) {
  return Array(times).fill(word).join(' ')
}

// TODO: annotate both parameters. What should this return?
export function isLong(word: any, minLength: any) {
  return word.length >= minLength
}
