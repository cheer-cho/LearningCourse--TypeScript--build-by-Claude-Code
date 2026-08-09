import { describe, expect, expectTypeOf, it } from 'vitest'
import { firstOf, joinWith, once, pad } from './checkpoint'

describe('✦ checkpoint 4 — functions', () => {
  it('pad left-pads with a default of space', () => {
    expect(pad('7', 3)).toBe('  7')
    expect(pad('7', 3, '0')).toBe('007')
    expect(pad('1234', 3)).toBe('1234')
    expectTypeOf(pad).toEqualTypeOf<(text: string, width: number, char?: string) => string>()
  })

  it('joinWith joins rest parts', () => {
    expect(joinWith('/', 'a', 'b', 'c')).toBe('a/b/c')
    expect(joinWith('-')).toBe('')
    expectTypeOf(joinWith).toEqualTypeOf<(separator: string, ...parts: string[]) => string>()
  })

  it('firstOf is overloaded with precise types', () => {
    expect(firstOf('abc')).toBe('a')
    expect(firstOf([1, 2, 3])).toBe(1)
    expect(firstOf([])).toBeUndefined()
    expectTypeOf(firstOf('abc')).toEqualTypeOf<string>()
    expectTypeOf(firstOf([1])).toEqualTypeOf<number | undefined>()
  })

  it('once runs the function a single time', () => {
    let calls = 0
    const boom = once(() => {
      calls++
    })
    boom()
    boom()
    boom()
    expect(calls).toBe(1)
    expectTypeOf(once).toEqualTypeOf<(fn: () => void) => () => void>()
  })
})
