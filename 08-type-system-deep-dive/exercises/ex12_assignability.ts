/**
 * ex12 — Assignability rules & excess property checks (quiz)
 *
 * Assignability isn't always intuitive: `any` is a black hole (fits
 * everywhere, accepts everything), `unknown` only flows IN, `never`
 * only flows OUT, and a "fresh" object literal gets extra scrutiny
 * (excess property checks) that a variable of the same shape doesn't.
 *
 * 1. describeTag(t): format an intersection-typed value as `id:tag`.
 * 2. Answer the quiz by experimenting: type each snippet somewhere
 *    (this file, the playground, anywhere), see what the compiler
 *    says, set the answer, then delete your experiment. Assume:
 *      let a: any; let u: unknown; let n: never
 *      function f(s: string): void {}
 *
 *   q1:  let x: string = a                        // any -> string
 *   q2:  let y: string = u                         // unknown -> string
 *   q3:  let z: string = n                         // never -> string
 *   q4:  let w: unknown = u; let v: any = w        // unknown var -> any
 *   q5:  f(n)                                      // never -> string param
 *   q6:  const t: { id: number; tag: string } =
 *          { id: 1, tag: 'x', extra: true }        // fresh literal, excess prop
 *   q7:  const t2: Tagged = { id: 1, tag: 'x' }     // exact shape into an intersection
 *   q8:  const s: Status = 'active'                 // literal into a union
 *   q9:  const str: string = 'active'; g(str)       // g(s: Status): void — widened string -> literal union
 *
 * Check: npm test -- 08 -t ex12
 */

export type Status = 'active' | 'inactive'
export type Tagged = { id: number } & { tag: string }

// TODO: implement -> `${id}:${tag}`
export function describeTag(t: Tagged): string {
  throw new Error('TODO: implement describeTag')
}

// Quiz — does each line COMPILE? Answer 'yes' or 'no'.
export const quiz: {
  q1: 'yes' | 'no'
  q2: 'yes' | 'no'
  q3: 'yes' | 'no'
  q4: 'yes' | 'no'
  q5: 'yes' | 'no'
  q6: 'yes' | 'no'
  q7: 'yes' | 'no'
  q8: 'yes' | 'no'
  q9: 'yes' | 'no'
} = {
  q1: 'no', // TODO
  q2: 'no', // TODO
  q3: 'no', // TODO
  q4: 'no', // TODO
  q5: 'no', // TODO
  q6: 'no', // TODO
  q7: 'no', // TODO
  q8: 'no', // TODO
  q9: 'no', // TODO
}
