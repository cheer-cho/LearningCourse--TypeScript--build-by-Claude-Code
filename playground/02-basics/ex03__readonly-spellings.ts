// The two spellings of a readonly array — identical meaning:
const a: readonly number[] = [1, 2, 3]
const b: ReadonlyArray<number> = [1, 2, 3]

// @ts-expect-error — 'readonly' only works with the bracket syntax
const c: readonly Array<number> = [1, 2, 3]

// @ts-expect-error — both spellings forbid mutation
a.push(4)
// @ts-expect-error
b.push(4)

console.log('a and b are the same type:', a.length + b.length)
