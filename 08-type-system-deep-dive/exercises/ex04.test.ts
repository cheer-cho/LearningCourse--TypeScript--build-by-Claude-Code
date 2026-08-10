import { describe, expectTypeOf, it } from 'vitest'
import type { ElementOf, FirstParam, ReturnOf, UnwrapPromise } from './ex04'

describe('ex08/ex04 — infer', () => {
  it('ElementOf reads the element type of an array', () => {
    expectTypeOf<ElementOf<string[]>>().toEqualTypeOf<string>()
    expectTypeOf<ElementOf<readonly number[]>>().toEqualTypeOf<number>()
  })

  it('UnwrapPromise resolves a Promise, or passes T through', () => {
    expectTypeOf<UnwrapPromise<Promise<string>>>().toEqualTypeOf<string>()
    expectTypeOf<UnwrapPromise<number>>().toEqualTypeOf<number>()
  })

  it('FirstParam reads the first parameter type of a function', () => {
    expectTypeOf<FirstParam<(a: string, b: number) => void>>().toEqualTypeOf<string>()
  })

  it('ReturnOf reads the return type of a function', () => {
    expectTypeOf<ReturnOf<() => number>>().toEqualTypeOf<number>()
    expectTypeOf<ReturnOf<(x: string) => boolean>>().toEqualTypeOf<boolean>()
  })
})
