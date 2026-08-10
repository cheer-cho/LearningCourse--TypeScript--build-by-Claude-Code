import { describe, expectTypeOf, it } from 'vitest'
import type { MyOmit, MyPartial, MyPick, MyReadonly, MyRecord, MyRequired, Task } from './ex09'

describe('ex08/ex09 — reimplementing mapped-type utilities', () => {
  it('MyPartial makes every property optional', () => {
    expectTypeOf<MyPartial<Task>>().toEqualTypeOf<{ id?: number; title?: string; done?: boolean }>()
  })

  it('MyRequired makes every property required', () => {
    expectTypeOf<MyRequired<{ id?: number; title?: string }>>().toEqualTypeOf<{ id: number; title: string }>()
  })

  it('MyReadonly makes every property readonly', () => {
    expectTypeOf<MyReadonly<Task>>().toEqualTypeOf<{
      readonly id: number
      readonly title: string
      readonly done: boolean
    }>()
  })

  it('MyPick keeps only the given keys', () => {
    expectTypeOf<MyPick<Task, 'id' | 'title'>>().toEqualTypeOf<{ id: number; title: string }>()
  })

  it('MyOmit drops the given keys', () => {
    expectTypeOf<MyOmit<Task, 'done'>>().toEqualTypeOf<{ id: number; title: string }>()
  })

  it('MyRecord builds an object type from a key union and a value type', () => {
    expectTypeOf<MyRecord<'a' | 'b', number>>().toEqualTypeOf<{ a: number; b: number }>()
  })
})
