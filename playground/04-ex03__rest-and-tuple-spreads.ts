// 04 / ex03 — two ways to avoid the "separator on an empty tail" bug,
// and what a tuple type buys you over an array type.

// ---------- 1. buildPath: branch vs. no branch ----------

// Your version: ask whether the tail is empty, then decide.
function buildPathBranch (base: string, ...segments: string[]): string {
  const path = segments.length > 0 ? '/' + segments.join('/') : ''
  return `${base}${path}`
}

// Alternative: make base just the first element. No empty case exists.
function buildPathJoin (base: string, ...segments: string[]): string {
  return [base, ...segments].join('/')
}

const cases: Array<[string, string[]]> = [
  ['api', []],
  ['api', ['users']],
  ['api', ['users', '42']],
]

for (const [base, segs] of cases) {
  const a = buildPathBranch(base, ...segs)
  const b = buildPathJoin(base, ...segs)
  console.log(`${JSON.stringify([base, ...segs]).padEnd(24)} branch=${a.padEnd(14)} join=${b.padEnd(14)} same=${a === b}`)
}

// ---------- 2. why the TUPLE type matters in callWith ----------

function callWith (
  fn: (a: number, b: string) => string,
  args: [number, string]     // fixed length, fixed order, per-slot types
): string {
  return fn(...args)
}

console.log(callWith((a, b) => b.repeat(a), [3, 'ab']))

// The tuple is what makes `fn(...args)` legal. Swap it for an array
// and TypeScript can no longer prove the call is well-formed:

function callWithArray (
  fn: (a: number, b: string) => string,
  args: (number | string)[]
): string {
  // @ts-expect-error  spread of a variable-length array cannot match (number, string)
  return fn(...args)
}
void callWithArray

// Tuples also reject the wrong shapes at compile time:
// @ts-expect-error  arguments in the wrong order
callWith((a, b) => `${a}${b}`, ['ab', 3])
// @ts-expect-error  too many elements
callWith((a, b) => `${a}${b}`, [3, 'ab', true])
// @ts-expect-error  too few elements
callWith((a, b) => `${a}${b}`, [3])
