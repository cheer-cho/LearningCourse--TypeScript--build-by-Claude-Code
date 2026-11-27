// A default type parameter (E = Error) is a fallback, not a requirement:
// it applies only when the caller leaves E out.
// Run: npm run playground ex04__default-type-param

type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E }

// ── 1. E left out → the default kicks in → E = Error ─────────
function parseAge(s: string): Result<number> {
  const n = Number(s)
  if (Number.isNaN(n)) {
    return { ok: false, error: new Error(`not a number: ${s}`) } // ✅ an Error object
  }
  return { ok: true, value: n }
}

// ── 2. E given → the default is ignored → E = string ─────────
function safeDivide(a: number, b: number): Result<number, string> {
  if (b === 0) return { ok: false, error: 'division by zero' } // ✅ a plain string
  return { ok: true, value: a / b }
}

// ── 3. Mixing them up ────────────────────────────────────────
// function bad(): Result<number> {
//   return { ok: false, error: 'oops' }
//   // ❌ TS2322: Type 'string' is not assignable to type 'Error'.
// }

// ── 4. Edge case: the default is a TYPE, not a value ─────────
// Nothing of type Error is created unless YOUR code calls `new Error(...)`.
// At runtime both results are plain objects; the types are erased.
const r1 = parseAge('abc')
const r2 = safeDivide(1, 0)

if (!r1.ok) console.log('parseAge   error.message ->', r1.error.message) // Error members
if (!r2.ok) console.log('safeDivide error.length  ->', r2.error.length) // string members
console.log('r1.error instanceof Error ->', !r1.ok && r1.error instanceof Error)
console.log('typeof r2.error           ->', !r2.ok && typeof r2.error)
