// The three rules that govern declaration merging.

// 1. Same property, SAME type -> fine (duplicates collapse).
interface A { id: string }
interface A { id: string; name: string }
const a: A = { id: '1', name: 'ok' }

// 2. Same property, DIFFERENT type -> error.
interface B { id: string }
// @ts-expect-error Subsequent property declarations must have the same type.
interface B { id: number }

// 3. `type` never merges.
// @ts-expect-error Duplicate identifier 'C'.
type C = { id: string }
// @ts-expect-error Duplicate identifier 'C'.
type C = { name: string }

console.log(a)
