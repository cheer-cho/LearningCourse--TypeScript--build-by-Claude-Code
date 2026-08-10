import { describe, expectTypeOf, it } from 'vitest'
import type { AllOptional, AllRequired, Mutable, Stringify, Task } from './ex05'

type Frozen = { readonly id: number; title?: string }

describe('ex08/ex05 — mapped types & modifiers', () => {
  it('Stringify turns every property value into a string', () => {
    expectTypeOf<Stringify<Task>>().toEqualTypeOf<{ id: string; title: string; done: string }>()
  })

  it('Mutable strips readonly from every property', () => {
    expectTypeOf<Mutable<Frozen>>().toEqualTypeOf<{ id: number; title?: string }>()
  })

  it('AllOptional makes every property optional', () => {
    expectTypeOf<AllOptional<Task>>().toEqualTypeOf<{ id?: number; title?: string; done?: boolean }>()
  })

  it('AllRequired makes every property required, keeping readonly', () => {
    expectTypeOf<AllRequired<Frozen>>().toEqualTypeOf<{ readonly id: number; title: string }>()
  })
})
