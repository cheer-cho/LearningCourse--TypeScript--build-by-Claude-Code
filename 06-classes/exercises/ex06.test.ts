import { describe, expect, expectTypeOf, it } from 'vitest'
import { LoggingStack, Stack } from './ex06'

describe('ex06/ex06 — generic classes & override', () => {
  it('push/pop/peek behave like a LIFO stack', () => {
    const s = new Stack<number>()
    expect(s.isEmpty()).toBe(true)
    s.push(1)
    s.push(2)
    s.push(3)
    expect(s.size).toBe(3)
    expect(s.peek()).toBe(3)
    expect(s.size).toBe(3)        // peek must NOT remove
    expect(s.pop()).toBe(3)
    expect(s.pop()).toBe(2)
    expect(s.size).toBe(1)
    expect(s.isEmpty()).toBe(false)
  })

  it('pop/peek on an empty stack return undefined', () => {
    const s = new Stack<string>()
    expect(s.pop()).toBeUndefined()
    expect(s.peek()).toBeUndefined()
    expect(s.isEmpty()).toBe(true)
    // a stack holding 0 is NOT empty — falsy items are still items
    const zeros = new Stack<number>()
    zeros.push(0)
    expect(zeros.isEmpty()).toBe(false)
    expect(zeros.peek()).toBe(0)
    expect(zeros.pop()).toBe(0)
    expect(zeros.isEmpty()).toBe(true)
  })

  it('Stack<T> is precisely typed per instantiation', () => {
    const s = new Stack<number>()
    expectTypeOf(s.push).toEqualTypeOf<(item: number) => void>()
    expectTypeOf(s.pop).toEqualTypeOf<() => number | undefined>()
    expectTypeOf(s.peek).toEqualTypeOf<() => number | undefined>()
    expectTypeOf(s.size).toEqualTypeOf<number>()
    expectTypeOf(s.isEmpty).toEqualTypeOf<() => boolean>()
  })

  it('LoggingStack records every push and pop, then delegates', () => {
    const s = new LoggingStack<string>()
    s.push('a')
    s.push('b')
    expect(s.pop()).toBe('b')
    expect(s.log).toEqual(['push', 'push', 'pop'])
    // popping empty still logs and still returns undefined
    const empty = new LoggingStack<number>()
    expect(empty.pop()).toBeUndefined()
    expect(empty.log).toEqual(['pop'])
    expect(s.size).toBe(1)
  })

  it('LoggingStack is-a Stack (extends, not reimplements)', () => {
    const s = new LoggingStack<number>()
    expect(s).toBeInstanceOf(Stack)
    expectTypeOf(s.push).toEqualTypeOf<(item: number) => void>()
  })
})
