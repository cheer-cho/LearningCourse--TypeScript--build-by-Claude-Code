import { describe, expect, expectTypeOf, it } from 'vitest'
import { assert, assertIsUser, greet, type User } from './ex08'

describe('ex05/ex08 — assertion functions', () => {
  it('assert throws on falsy and passes on truthy', () => {
    expect(() => assert(false, 'boom')).toThrow('boom')
    expect(() => assert(0, 'zero')).toThrow('zero')
    expect(() => assert(1, 'fine')).not.toThrow()
    expect(() => assert('', 'empty')).toThrow('empty')
    expect(() => assert(null, 'nope')).toThrow('nope')
    expect(() => assert('ok', 'fine')).not.toThrow()
    expectTypeOf(assert).toEqualTypeOf<(condition: unknown, message: string) => asserts condition>()
  })

  it('assert narrows the checked condition for the rest of the scope', () => {
    const value = 'hello' as string | null
    assert(value !== null, 'must exist')
    expectTypeOf<typeof value>().toEqualTypeOf<string>()
    expect(value).toBe('hello')
  })

  it('assertIsUser validates the shape at runtime', () => {
    expect(() => assertIsUser({ name: 'Ada', age: 36 })).not.toThrow()
    expect(() => assertIsUser(null)).toThrow()
    expect(() => assertIsUser('Ada')).toThrow()
    expect(() => assertIsUser({ name: 'Ada' })).toThrow()
    expect(() => assertIsUser({ name: 42, age: 36 })).toThrow()
    expect(() => assertIsUser({ name: 'Ada', age: '36' })).toThrow()
    // falsy-but-valid fields must PASS — validate the type, not the truthiness
    expect(() => assertIsUser({ name: '', age: 0 })).not.toThrow()
    expectTypeOf(assertIsUser).toEqualTypeOf<(value: unknown) => asserts value is User>()
  })

  it('assertIsUser narrows unknown to User across the call', () => {
    const raw: unknown = JSON.parse('{"name":"Ada","age":36}')
    assertIsUser(raw)
    expectTypeOf<typeof raw>().toEqualTypeOf<User>()
  })

  it('assertIsUser errors say WHAT failed, not just that something failed', () => {
    // A bare `throw new Error()` has message '' — useless when debugging.
    const messageFor = (input: unknown): string => {
      try {
        assertIsUser(input)
      } catch (error) {
        return (error as Error).message
      }
      return '(did not throw)'
    }
    expect(messageFor(null)).not.toBe('')
    expect(messageFor({ age: 1 })).not.toBe('')
    expect(messageFor({ name: 'Ada' })).not.toBe('')
    // Different failures deserve different explanations.
    expect(messageFor({ age: 1 })).not.toBe(messageFor({ name: 'Ada' }))
  })

  it('greet lets the assertion error through unchanged', () => {
    // Wrapping in try/catch and rethrowing `new Error()` replaces a useful
    // message with an empty one. The original error should surface as-is.
    let fromAssertion = ''
    try {
      assertIsUser({ age: 1 })
    } catch (error) {
      fromAssertion = (error as Error).message
    }
    expect(() => greet({ age: 1 })).toThrow(fromAssertion)
  })

  it('greet relies on the assertion instead of casts', () => {
    expect(greet({ name: 'Ada', age: 36 })).toBe('Hello, Ada')
    expect(greet({ name: '', age: 0 })).toBe('Hello, ')
    expect(() => greet(null)).toThrow()
    expect(() => greet({ age: 1 })).toThrow()
    expectTypeOf(greet).toEqualTypeOf<(value: unknown) => string>()
  })
})
