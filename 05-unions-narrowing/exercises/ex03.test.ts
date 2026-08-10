import { describe, expect, expectTypeOf, it } from 'vitest'
import { concatIfBothStrings, padLeft, toLines } from './ex03'

describe('ex05/ex03 — typeof, truthiness, equality narrowing', () => {
  it('padLeft narrows padding with typeof', () => {
    expect(padLeft('hi', 4)).toBe('    hi')
    expect(padLeft('hi', 0)).toBe('hi')
    expect(padLeft('hi', '>>')).toBe('>>hi')
    expectTypeOf(padLeft).toEqualTypeOf<(value: string, padding: string | number) => string>()
  })

  it('toLines handles null, string, and array — without eating ""', () => {
    expect(toLines(null)).toEqual([])
    expect(toLines('a')).toEqual(['a'])
    expect(toLines('')).toEqual([''])
    expect(toLines(['a', 'b'])).toEqual(['a', 'b'])
    expectTypeOf(toLines).toEqualTypeOf<(input: string | string[] | null) => string[]>()
  })

  it('equality narrowing: x === y proves both are strings', () => {
    expect(concatIfBothStrings('ab', 'ab')).toBe('ABAB')
    expect(concatIfBothStrings(7, 'x')).toBe('7/x')
    expect(concatIfBothStrings('a', true)).toBe('a/true')
    expectTypeOf(concatIfBothStrings).toEqualTypeOf<
      (x: string | number, y: string | boolean) => string
    >()
  })
})
