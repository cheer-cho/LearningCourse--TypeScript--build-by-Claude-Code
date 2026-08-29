import { describe, expectTypeOf, it } from 'vitest'
import type {
  MyAwaited,
  MyConstructorParameters,
  MyExclude,
  MyExtract,
  MyNonNullable,
  MyParameters,
  MyReturnType,
} from './ex10'

class Widget {
  constructor(
    public label: string,
    public count: number,
  ) {}
}

describe('ex08/ex10 — reimplementing conditional & infer utilities', () => {
  it('MyExclude removes assignable union members', () => {
    expectTypeOf<MyExclude<'a' | 'b' | 'c', 'a'>>().toEqualTypeOf<'b' | 'c'>()
    expectTypeOf<MyExclude<'a', 'a'>>().toEqualTypeOf<never>()  // excluding everything
  })

  it('MyExtract keeps only assignable union members', () => {
    expectTypeOf<MyExtract<'a' | 'b' | 42, string>>().toEqualTypeOf<'a' | 'b'>()
  })

  it('MyNonNullable strips null and undefined', () => {
    expectTypeOf<MyNonNullable<string | null | undefined>>().toEqualTypeOf<string>()
  })

  it('MyReturnType reads a function return type', () => {
    expectTypeOf<MyReturnType<() => number>>().toEqualTypeOf<number>()
  })

  it('MyParameters reads function parameters as a tuple', () => {
    expectTypeOf<MyParameters<(a: string, b: number) => void>>().toEqualTypeOf<[string, number]>()
  })

  it('MyConstructorParameters reads a constructor parameters tuple', () => {
    expectTypeOf<MyConstructorParameters<typeof Widget>>().toEqualTypeOf<[string, number]>()
  })

  it('MyAwaited unwraps nested Promises recursively', () => {
    expectTypeOf<MyAwaited<Promise<Promise<string>>>>().toEqualTypeOf<string>()
    expectTypeOf<MyAwaited<number>>().toEqualTypeOf<number>()
    // recurses ALL the way down, unlike ex04's single-level UnwrapPromise
    expectTypeOf<MyAwaited<Promise<Promise<Promise<number>>>>>().toEqualTypeOf<number>()
  })
})
