import { describe, expect, expectTypeOf, it } from 'vitest'
import {
  makeEntity,
  type Entity,
  type Identified,
  type Impossible,
  type Overlap,
  type Serializable,
} from './ex02'

describe('ex05/ex02 — intersection types', () => {
  it('Entity combines both object types', () => {
    expectTypeOf<Entity>().toEqualTypeOf<Identified & Serializable>()
  })

  it('intersecting overlapping literal unions keeps only the overlap', () => {
    expectTypeOf<Overlap>().toEqualTypeOf<'b'>()
  })

  it('intersecting incompatible primitives collapses to never', () => {
    expectTypeOf<Impossible>().toEqualTypeOf<never>()
  })

  it('makeEntity builds a value satisfying BOTH parts', () => {
    const e = makeEntity(7, 'hello')
    expect(e.id).toBe(7)
    expect(e.serialize()).toBe('7:hello')
    expect(makeEntity(1, 'x').serialize()).toBe('1:x')
    expect(makeEntity(0, '').serialize()).toBe('0:')  // falsy id and payload
    expect(makeEntity(0, 'x').id).toBe(0)
    expectTypeOf(makeEntity).toEqualTypeOf<(id: number, payload: string) => Entity>()
  })
})
