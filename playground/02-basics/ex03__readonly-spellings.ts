// The two spellings of a readonly array, and what `readonly` does at runtime.
// Run: npm run playground readonly-spellings

// The two spellings of a readonly array — identical meaning:
const a: readonly number[] = [1, 2, 3]
const b: ReadonlyArray<number> = [1, 2, 3]

// @ts-expect-error — 'readonly' only works with the bracket syntax
const c: readonly Array<number> = [1, 2, 3]

// @ts-expect-error — both spellings forbid mutation
a.push(4)
// @ts-expect-error
b.push(4)

// `readonly` is erased at compile time. The silenced push calls above
// really ran, so both arrays grew. The type system was the only guard.
console.log('a after push ->', a)
console.log('b after push ->', b)
console.log('c (plain array at runtime) ->', c)
