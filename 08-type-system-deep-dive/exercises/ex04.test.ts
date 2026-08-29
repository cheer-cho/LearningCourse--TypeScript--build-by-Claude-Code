import { describe, expectTypeOf, it } from 'vitest'
import type { ElementOf, FirstParam, ReturnOf, UnwrapPromise } from './ex04'

describe('ex08/ex04 — infer', () => {
  it('ElementOf reads the element type of an array', () => {
    expectTypeOf<ElementOf<string[]>>().toEqualTypeOf<string>()
    expectTypeOf<ElementOf<readonly number[]>>().toEqualTypeOf<number>()
    expectTypeOf<ElementOf<string>>().toEqualTypeOf<never>()  // a string is not an array
  })

  it('UnwrapPromise resolves a Promise, or passes T through', () => {
    expectTypeOf<UnwrapPromise<Promise<string>>>().toEqualTypeOf<string>()
    expectTypeOf<UnwrapPromise<number>>().toEqualTypeOf<number>()
    // ONE level only — compare with MyAwaited in ex10, which recurses
    expectTypeOf<UnwrapPromise<Promise<Promise<string>>>>().toEqualTypeOf<Promise<string>>()
  })

  it('FirstParam reads the first parameter type of a function', () => {
    expectTypeOf<FirstParam<(a: string, b: number) => void>>().toEqualTypeOf<string>()
    // a zero-arg function still matches — infer lands on unknown, not never
    expectTypeOf<FirstParam<() => void>>().toEqualTypeOf<unknown>()
  })

  it('ReturnOf reads the return type of a function', () => {
    expectTypeOf<ReturnOf<() => number>>().toEqualTypeOf<number>()
    expectTypeOf<ReturnOf<(x: string) => boolean>>().toEqualTypeOf<boolean>()
    expectTypeOf<ReturnOf<() => void>>().toEqualTypeOf<void>()
  })
})
