import { describe, expectTypeOf, it } from 'vitest'
import type { Getters, PickByType, Task } from './ex06'

describe('ex08/ex06 — key remapping with as', () => {
  it('Getters builds a get-method per property', () => {
    expectTypeOf<Getters<Task>>().toEqualTypeOf<{
      getId: () => number
      getTitle: () => string
      getDone: () => boolean
    }>()
  })

  it('PickByType filters properties by their value type', () => {
    expectTypeOf<PickByType<Task, string>>().toEqualTypeOf<{ title: string }>()
    expectTypeOf<PickByType<Task, number | boolean>>().toEqualTypeOf<{ id: number; done: boolean }>()
  })
})
