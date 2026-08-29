import { describe, expect, expectTypeOf, it } from 'vitest'
import { Stack } from './ex05'

describe('ex07/ex05 — generic classes', () => {
  it('Stack<string> pushes, peeks and pops in LIFO order', () => {
    const stack = new Stack<string>()
    expect(stack.size).toBe(0)
    stack.push('a')
    stack.push('b')
    expect(stack.size).toBe(2)
    expect(stack.peek()).toBe('b')
    expect(stack.size).toBe(2) // peek does not remove
    expect(stack.pop()).toBe('b')
    expect(stack.pop()).toBe('a')
    expect(stack.pop()).toBeUndefined()
    expect(stack.peek()).toBeUndefined()
    expect(stack.size).toBe(0)
  })

  it('the whole instance is specialized to T', () => {
    const stack = new Stack<number>()
    expectTypeOf(stack.push).parameter(0).toEqualTypeOf<number>()
    expectTypeOf(stack.pop).returns.toEqualTypeOf<number | undefined>()
    expectTypeOf(stack.peek).returns.toEqualTypeOf<number | undefined>()
    stack.push(1)
    stack.push(2)
    expect(stack.pop()).toBe(2)
    // a stack holding 0 must not read as empty
    const zeros = new Stack<number>()
    zeros.push(0)
    expect(zeros.size).toBe(1)
    expect(zeros.peek()).toBe(0)
    expect(zeros.pop()).toBe(0)
  })
})
