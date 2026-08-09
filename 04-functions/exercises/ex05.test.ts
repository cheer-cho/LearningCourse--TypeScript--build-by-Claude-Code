import { describe, expect, expectTypeOf, it } from 'vitest'
import { makeCounter, type Counter } from './ex05'

describe('ex04/ex05 — this typing', () => {
  it('increment declares this: Counter', () => {
    expectTypeOf<Counter['increment']>().thisParameter.toEqualTypeOf<Counter>()
  })

  it('counting works through the object', () => {
    const counter = makeCounter()
    expect(counter.count).toBe(0)
    expect(counter.increment()).toBe(1)
    expect(counter.increment()).toBe(2)
    expect(counter.count).toBe(2)
  })

  it('two counters are independent', () => {
    const a = makeCounter()
    const b = makeCounter()
    a.increment()
    expect(a.count).toBe(1)
    expect(b.count).toBe(0)
  })
})
