// What you LOSE with only the implementation signature.
// Deliberately NOT the ex04 functions — same shape, different names.

// ============ A. Only the implementation signature ============
export function joinLoose(sep: string | number, times?: number): string | number {
  if (typeof sep === 'string') return sep.repeat(times ?? 1)
  return sep * (times ?? 1)
}

const l1 = joinLoose('ab', 2)
// l1: string | number  -> you KNOW it's a string, TS doesn't:
// l1.toUpperCase()            // Error: Property 'toUpperCase' does not exist on type 'number'
const l1ok = (l1 as string).toUpperCase()   // cast at EVERY call site. Yuck.

joinLoose('ab')        // fine
joinLoose(3)           // fine
joinLoose('ab', 2)     // fine... and so is nonsense the body never handles well:

// ============ B. Same body, with overloads ============
export function join(sep: string, times: number): string
export function join(sep: number, times: number): number
export function join(sep: string | number, times: number): string | number {
  if (typeof sep === 'string') return sep.repeat(times)
  return sep * times
}

const j1 = join('ab', 2)
const j1ok = j1.toUpperCase()   // no cast needed: j1 is string
const j2 = join(3, 2)           // j2 is number

// @ts-expect-error  arity is now enforced: `times` is required in BOTH overloads
join('ab')

console.log({ l1, l1ok, j1, j1ok, j2 })
