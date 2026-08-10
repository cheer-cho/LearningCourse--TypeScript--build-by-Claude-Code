import { describe, expectTypeOf, it } from 'vitest'
import type { DeepReadonly, Json, Split } from './ex08'

describe('ex08/ex08 — recursive types', () => {
  it('Json accepts nested JSON shapes and rejects non-JSON values', () => {
    expectTypeOf<{ a: number; b: string[]; c: { d: boolean | null } }>().toExtend<Json>()
    expectTypeOf<{ fn: () => void }>().not.toExtend<Json>()
  })

  it('DeepReadonly freezes every nested level', () => {
    expectTypeOf<DeepReadonly<{ a: { b: number[] } }>>().toEqualTypeOf<{
      readonly a: { readonly b: readonly number[] }
    }>()
  })

  it('Split breaks a string literal into a tuple of parts', () => {
    expectTypeOf<Split<'a.b.c', '.'>>().toEqualTypeOf<['a', 'b', 'c']>()
    expectTypeOf<Split<'a', '.'>>().toEqualTypeOf<['a']>()
  })
})
