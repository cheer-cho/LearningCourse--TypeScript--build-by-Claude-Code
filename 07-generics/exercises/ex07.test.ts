import { describe, expect, expectTypeOf, it } from 'vitest'
import { emptyList, parseAs, type Dict } from './ex07'

describe('ex07/ex07 — defaults & explicit type arguments', () => {
  it('Dict defaults its value type to string', () => {
    expectTypeOf<Dict>().toEqualTypeOf<Record<string, string>>()
    expectTypeOf<Dict<number>>().toEqualTypeOf<Record<string, number>>()
  })

  it('emptyList uses the default unless told otherwise', () => {
    const strings = emptyList()
    expect(strings).toEqual([])
    expectTypeOf(strings).toEqualTypeOf<string[]>()

    const nums = emptyList<number>()
    expect(nums).toEqual([])
    expectTypeOf(nums).toEqualTypeOf<number[]>()
    expect(nums).not.toBe(strings) // a FRESH array each call
  })

  it('parseAs is honest (unknown) until the caller commits', () => {
    const loose = parseAs('{"x":true}')
    expect(loose).toEqual({ x: true })
    expectTypeOf(loose).toEqualTypeOf<unknown>()

    const user = parseAs<{ id: number }>('{"id":7}')
    expect(user).toEqual({ id: 7 })
    expect(parseAs<number>('0')).toBe(0)
    expect(parseAs('null')).toBeNull()
    expect(parseAs<string>('""')).toBe('')
    expectTypeOf(user).toEqualTypeOf<{ id: number }>()
  })
})
