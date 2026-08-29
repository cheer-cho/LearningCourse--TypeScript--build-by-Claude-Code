import { describe, expect, expectTypeOf, it } from 'vitest'
import { firstOf, joinWith, once, pad } from './checkpoint'

describe('✦ checkpoint 4 — functions', () => {
  it('pad left-pads with a default of space', () => {
    expect(pad('7', 3)).toBe('  7')
    expect(pad('7', 3, '0')).toBe('007')
    expect(pad('1234', 3)).toBe('1234')
    expect(pad('123', 3)).toBe('123')      // boundary: already exactly wide
    expect(pad('7', 0)).toBe('7')
    // an explicit '' is a PASSED char, so the default must not fire
    expect(pad('7', 3, '')).toBe('7')
    expectTypeOf(pad).toEqualTypeOf<(text: string, width: number, char?: string) => string>()
  })

  it('joinWith joins rest parts', () => {
    expect(joinWith('/', 'a', 'b', 'c')).toBe('a/b/c')
    expect(joinWith('-')).toBe('')
    expect(joinWith('-', 'a')).toBe('a')   // no separator for a single part
    expect(joinWith('', 'a', 'b')).toBe('ab')
    expectTypeOf(joinWith).toEqualTypeOf<(separator: string, ...parts: string[]) => string>()
  })

  it('firstOf is overloaded with precise types', () => {
    expect(firstOf('abc')).toBe('a')
    expect(firstOf([1, 2, 3])).toBe(1)
    expect(firstOf([])).toBeUndefined()
    expect(firstOf('')).toBe('')           // empty string has no first char
    expect(firstOf([0, 1])).toBe(0)        // 0 is a real first item
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
    // each wrapper has its own latch
    let other = 0
    const again = once(() => {
      other++
    })
    again()
    again()
    expect(other).toBe(1)
    expect(boom()).toBeUndefined()
    expectTypeOf(once).toEqualTypeOf<(fn: () => void) => () => void>()
  })
})
