// Run: npx tsc --noEmit --strict playground/contextual-param.ts
type Field = 'user' | 'text' | 'sentAt'

// No annotation on `property` — the const's type supplies it.
const fail: (property: Field) => never = (property) => {
  const check: Field = property        // ✓ property is already Field
  // @ts-expect-error  Field is not a number, so TS is not treating it as any
  const wrong: number = property
  throw new Error(`${property} ${check} ${wrong}`)
}

fail('user')
// @ts-expect-error  'nope' is not a Field
fail('nope')
