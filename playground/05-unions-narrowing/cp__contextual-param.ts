// Contextual typing: an unannotated arrow parameter takes its type from the const's annotation.
// Run: npm run playground contextual-param
type Field = 'user' | 'text' | 'sentAt'

// No annotation on `property` — the const's type supplies it.
const fail: (property: Field) => never = (property) => {
  const check: Field = property        // ✓ property is already Field
  // @ts-expect-error  Field is not a number, so TS is not treating it as any
  const wrong: number = property
  throw new Error(`${property} ${check} ${wrong}`)
}

try {
  fail('user')
} catch (e) {
  console.log("fail('user') ->", (e as Error).message)
}
try {
  // @ts-expect-error  'nope' is not a Field
  fail('nope')
} catch (e) {
  console.log("fail('nope') ->", (e as Error).message, '(types are erased; runtime does not check)')
}
