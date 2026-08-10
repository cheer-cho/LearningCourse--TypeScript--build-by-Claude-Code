import { describe, expect, expectTypeOf, it } from 'vitest'
import { greet } from './ex03'

describe('ex09/ex03 — namespaces & function merging', () => {
  it('greet is callable with an optional options object', () => {
    expect(greet('Ada')).toBe('Hello, Ada!')
    expect(greet('Ada', { punctuation: '?!' })).toBe('Hello, Ada?!')
    expectTypeOf(greet).parameter(0).toEqualTypeOf<string>()
    expectTypeOf(greet).parameter(1).toEqualTypeOf<greet.Options | undefined>()
    expectTypeOf(greet).returns.toEqualTypeOf<string>()
  })

  it('greet carries the merged namespace members', () => {
    expect(greet.defaultName).toBe('world')
    expect(greet.shout(greet.defaultName)).toBe('HELLO, WORLD!')
    expectTypeOf<typeof greet.defaultName>().toEqualTypeOf<'world'>()
    expectTypeOf(greet.shout).toEqualTypeOf<(name: string) => string>()
  })

  it('the namespace holds types too', () => {
    expectTypeOf<greet.Options>().toEqualTypeOf<{ punctuation?: string }>()
  })
})
