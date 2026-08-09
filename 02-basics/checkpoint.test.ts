import { describe, expect, expectTypeOf, it } from 'vitest'
import { DURATIONS, LIGHTS, next, simulate, type Light } from './checkpoint'

describe('✦ checkpoint 2 — basics', () => {
  it('Light is the three-state union', () => {
    expectTypeOf<Light>().toEqualTypeOf<'red' | 'green' | 'yellow'>()
  })

  it('LIGHTS is a readonly literal tuple', () => {
    expect(LIGHTS).toEqual(['red', 'green', 'yellow'])
    expectTypeOf(LIGHTS).toEqualTypeOf<readonly ['red', 'green', 'yellow']>()
  })

  it('DURATIONS is a [number, number, number] tuple', () => {
    expect(DURATIONS).toEqual([30, 25, 5])
    expectTypeOf(DURATIONS).toEqualTypeOf<[number, number, number]>()
  })

  it('next cycles red -> green -> yellow -> red', () => {
    expect(next('red')).toBe('green')
    expect(next('green')).toBe('yellow')
    expect(next('yellow')).toBe('red')
    expectTypeOf(next).toEqualTypeOf<(light: Light) => Light>()
  })

  it('simulate returns the following states', () => {
    expect(simulate('red', 3)).toEqual(['green', 'yellow', 'red'])
    expect(simulate('green', 1)).toEqual(['yellow'])
    expect(simulate('yellow', 0)).toEqual([])
    expectTypeOf(simulate).toEqualTypeOf<(start: Light, steps: number) => Light[]>()
  })
})
