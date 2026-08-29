import { describe, expect, expectTypeOf, it } from 'vitest'
import { add, isLong, repeat, shout } from './ex01'

describe('ex01 — type annotations', () => {
  it('add: works and is typed (number, number) => number', () => {
    expect(add(2, 3)).toBe(5)
    expectTypeOf(add).toEqualTypeOf<(a: number, b: number) => number>()
  })

  it('shout: works and is typed (string) => string', () => {
    expect(shout('hey')).toBe('HEY!')
    expect(shout('')).toBe('!')
    expectTypeOf(shout).toEqualTypeOf<(word: string) => string>()
  })

  it('repeat: works and is typed (string, number) => string', () => {
    expect(repeat('ts', 3)).toBe('ts ts ts')
    expect(repeat('ts', 1)).toBe('ts')   // no trailing separator
    expect(repeat('ts', 0)).toBe('')
    expectTypeOf(repeat).toEqualTypeOf<(word: string, times: number) => string>()
  })

  it('isLong: works and is typed (string, number) => boolean', () => {
    expect(isLong('typescript', 5)).toBe(true)
    expect(isLong('ts', 5)).toBe(false)
    // the boundary: length === minLength counts as long (>=, not >)
    expect(isLong('exact', 5)).toBe(true)
    expect(isLong('', 0)).toBe(true)
    expectTypeOf(isLong).toEqualTypeOf<(word: string, minLength: number) => boolean>()
  })
})
