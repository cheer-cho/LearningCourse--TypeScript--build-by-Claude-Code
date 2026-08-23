/**
 * ex07 — Structural typing & excess property checks
 *
 * TypeScript matches shapes, not names — extra properties are fine…
 * except on fresh inline literals, where they're treated as typos.
 *
 * 1. Implement greet: works for ANY object with a name.
 * 2. `robot` has extra properties — pass it to greet anyway (it fits
 *    structurally) and export the result.
 * 3. Answer the two quiz questions by experimenting: try typing the
 *    described code in this file, see what the compiler says, then set
 *    the answers and delete your experiments.
 *
 * Check: npm test -- 03 -t ex07
 */

export type Named = { name: string }

// TODO: implement -> 'Hello, <name>!'
export function greet (entity: Named): string {
  return `Hello, ${entity.name}!`
}

export const robot = { name: 'R2-D2', wheels: 3 }

// TODO: replace with greet(robot).
export const robotGreeting: string = greet(robot)

// Quiz — does each line compile? Answer 'yes' or 'no'.
//   q1:  greet({ name: 'Ada', age: 36 })     // inline literal with extra
//   q2:  const p = { name: 'Ada', age: 36 }; greet(p)   // via variable
export const quiz: { q1: 'yes' | 'no'; q2: 'yes' | 'no' } = {
  q1: 'no',
  // the greet({ name: 'Ada', age: 36 }) is not working because, it is an inline iteral
  // Therefore, it is treated as typo
  q2: 'yes'
  // the greet({ name: 'Ada', age: 36 }) is complied because, it is infer,
  // the object has required fields which satisfies the function argument
}
