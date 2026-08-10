/**
 * ex03 — Which strict flag saves you?
 *
 * A quiz, answered in code. For each scenario below, set the answer to
 * the flag that catches the bug. All answers currently say 'noImplicitAny'
 * as a placeholder — most are wrong. Fix them.
 *
 * (The type `StrictFlag` limits you to real flag names, so typos are
 * caught at compile time — a taste of literal-union types, coming in
 * module 02.)
 *
 * Check: npm test -- 01 -t ex03
 */

type StrictFlag =
  | 'noImplicitAny'
  | 'strictNullChecks'
  | 'noUncheckedIndexedAccess'
  | 'strictPropertyInitialization'
  | 'useUnknownInCatchVariables'
  | 'exactOptionalPropertyTypes'

export const quiz: Record<'q1' | 'q2' | 'q3' | 'q4' | 'q5', StrictFlag> = {
  // q1: `function greet(name) { ... }` — `name` silently becomes `any`.
  //     Which flag turns this into an error?
  q1: 'noImplicitAny', // (this one is a freebie — it's correct)

  // q2: `const city: string = null` — which flag rejects this?
  q2: 'strictNullChecks', // TODO

  // q3: `const first = list[0]; first.toUpperCase()` — list might be
  //     empty. Which flag makes `list[0]` include `undefined`?
  q3: 'noUncheckedIndexedAccess', // TODO

  // q4: `catch (e) { console.log(e.message) }` — which flag types `e`
  //     as `unknown` instead of `any`?
  q4: 'useUnknownInCatchVariables', // TODO

  // q5: `const cfg: { retries?: number } = { retries: undefined }` —
  //     which flag says "optional means ABSENT, not undefined"?
  q5: 'exactOptionalPropertyTypes', // TODO
}
