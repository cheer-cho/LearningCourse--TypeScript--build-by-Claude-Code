import { describe, expect, expectTypeOf, it } from 'vitest'
import { mode, opposite, ORIGIN, type Direction } from './ex05'

describe('ex02/ex05 — literal types & widening', () => {
  it('Direction is the union of the four compass points', () => {
    expectTypeOf<Direction>().toEqualTypeOf<'north' | 'south' | 'east' | 'west'>()
  })

  it('opposite flips both axes and is fully typed', () => {
    expect(opposite('north')).toBe('south')
    expect(opposite('south')).toBe('north')
    expect(opposite('east')).toBe('west')
    expect(opposite('west')).toBe('east')
    expectTypeOf(opposite).toEqualTypeOf<(dir: Direction) => Direction>()
  })

  it('ORIGIN is deeply literal and readonly', () => {
    expect(ORIGIN).toEqual({ x: 0, y: 0 })
    expectTypeOf(ORIGIN).toEqualTypeOf<{ readonly x: 0; readonly y: 0 }>()
  })

  it("mode keeps the literal type 'dark'", () => {
    expect(mode).toBe('dark')
    expectTypeOf(mode).toEqualTypeOf<'dark'>()
  })
})
