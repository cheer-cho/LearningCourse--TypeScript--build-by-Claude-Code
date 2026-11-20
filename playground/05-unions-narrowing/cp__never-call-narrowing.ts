// Which "throwing helper" calls narrow the code after them? Expect two TS18046 errors (A and D).
// Run: npm run playground never-call-narrowing
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

// At runtime all five behave the same — the difference is only in the checker.
for (const [label, demo] of [['A', demoA], ['B', demoB], ['C', demoC], ['D', demoD], ['E', demoE]] as const) {
  console.log(`demo${label} ->`, demo())
}

export { demoA, demoB, demoC, demoD, demoE }
export type { InferredA, InferredD }
