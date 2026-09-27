// Run: npx tsc --noEmit --strict playground/never-call-narrowing.ts
// Question: after `if (bad) helper()`, does TS know we are still here
// ONLY when `bad` was false?  Only if it knows helper() never returns.

const user: unknown = 'ada'

// ── A. arrow, no annotation ──────────────────────────────────────────
const failA = () => {
  throw new Error('A')
}
type InferredA = ReturnType<typeof failA>   // hover: never  ← TS *did* infer it
function demoA() {
  if (typeof user !== 'string') failA()
  return user.toUpperCase()                  // ✗ 'user' is of type 'unknown'
}

// ── B. arrow, explicit `: () => never` on the const ──────────────────
const failB: () => never = () => {
  throw new Error('B')
}
function demoB() {
  if (typeof user !== 'string') failB()
  return user.toUpperCase()                  // ✓ narrowed to string
}

// ── C. function declaration, explicit `: never` return ───────────────
function failC(): never {
  throw new Error('C')
}
function demoC() {
  if (typeof user !== 'string') failC()
  return user.toUpperCase()                  // ✓
}

// ── D. function declaration, NO annotation ───────────────────────────
function failD() {
  throw new Error('D')
}
type InferredD = ReturnType<typeof failD>   // hover: void  ← declarations infer void, not never
function demoD() {
  if (typeof user !== 'string') failD()
  return user.toUpperCase()                  // ✗
}

// ── E. the workaround when you want no annotation: use `return` ──────
function demoE() {
  if (typeof user !== 'string') return failA() // the branch now ends explicitly
  return user.toUpperCase()                  // ✓
}

export { demoA, demoB, demoC, demoD, demoE }
export type { InferredA, InferredD }
