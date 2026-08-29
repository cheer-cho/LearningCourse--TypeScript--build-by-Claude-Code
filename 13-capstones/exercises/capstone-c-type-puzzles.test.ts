import { describe, expect, expectTypeOf, it } from 'vitest'
import {
  flatten,
  getByPath,
  zip,
  type CamelCase,
  type Flatten,
  type GetByPath,
  type IsNever,
  type Join,
  type ObjectPaths,
  type OptionalKeys,
  type RequiredKeys,
  type Split,
  type UnionToIntersection,
  type Zip,
} from './capstone-c-type-puzzles'

describe('capstone-c — Split / Join', () => {
  it('Split breaks a string literal into a tuple on the delimiter', () => {
    expectTypeOf<Split<'a.b.c', '.'>>().toEqualTypeOf<['a', 'b', 'c']>()
    expectTypeOf<Split<'a', '.'>>().toEqualTypeOf<['a']>()
    expectTypeOf<Split<'one-two-three', '-'>>().toEqualTypeOf<['one', 'two', 'three']>()
    expectTypeOf<Split<'', '.'>>().toEqualTypeOf<['']>()
  })

  it('Join is the inverse of Split', () => {
    expectTypeOf<Join<['a', 'b', 'c'], '.'>>().toEqualTypeOf<'a.b.c'>()
    expectTypeOf<Join<['a'], '.'>>().toEqualTypeOf<'a'>()
    expectTypeOf<Join<[], '.'>>().toEqualTypeOf<''>()
    expectTypeOf<Join<['a', 'b'], ''>>().toEqualTypeOf<'ab'>()
  })
})

describe('capstone-c — CamelCase', () => {
  it('converts snake_case and kebab-case to camelCase', () => {
    expectTypeOf<CamelCase<'hello_world'>>().toEqualTypeOf<'helloWorld'>()
    expectTypeOf<CamelCase<'foo-bar-baz'>>().toEqualTypeOf<'fooBarBaz'>()
    expectTypeOf<CamelCase<'already'>>().toEqualTypeOf<'already'>()
    expectTypeOf<CamelCase<'a_b_c'>>().toEqualTypeOf<'aBC'>()  // single-letter segments
  })
})

describe('capstone-c — ObjectPaths / GetByPath', () => {
  it('ObjectPaths lists every dot-path, including intermediate ones', () => {
    expectTypeOf<ObjectPaths<{ a: { b: { c: number } }; d: string }>>().toEqualTypeOf<'a' | 'a.b' | 'a.b.c' | 'd'>()
  })

  it('GetByPath resolves the type at the end of a dot path', () => {
    expectTypeOf<GetByPath<{ a: { b: { c: number } } }, 'a.b.c'>>().toEqualTypeOf<number>()
    expectTypeOf<GetByPath<{ a: { b: { c: number } } }, 'a.b'>>().toEqualTypeOf<{ c: number }>()
  })

  it('getByPath (runtime) reads the nested value and infers its type', () => {
    const nested = { a: { b: { c: 42 } }, d: 'hi' }
    const value = getByPath(nested, 'a.b.c')
    expect(value).toBe(42)
    expectTypeOf(value).toEqualTypeOf<number>()

    const branch = getByPath(nested, 'a.b')
    expect(branch).toEqual({ c: 42 })
    expectTypeOf(branch).toEqualTypeOf<{ c: number }>()

    const leaf = getByPath(nested, 'd')
    expect(leaf).toBe('hi')
    expectTypeOf(leaf).toEqualTypeOf<string>()
  })
})

describe('capstone-c — UnionToIntersection', () => {
  it('turns a union of object types into their intersection', () => {
    expectTypeOf<UnionToIntersection<{ a: 1 } | { b: 2 }>>().toEqualTypeOf<{ a: 1 } & { b: 2 }>()
  })
})

describe('capstone-c — IsNever', () => {
  it('is true only for never, false for anything else', () => {
    expectTypeOf<IsNever<never>>().toEqualTypeOf<true>()
    expectTypeOf<IsNever<string>>().toEqualTypeOf<false>()
    expectTypeOf<IsNever<string | number>>().toEqualTypeOf<false>()
  })
})

describe('capstone-c — Zip', () => {
  it('pairs elements position-by-position, at the type level', () => {
    expectTypeOf<Zip<[1, 2, 3], ['a', 'b', 'c']>>().toEqualTypeOf<[[1, 'a'], [2, 'b'], [3, 'c']]>()
  })

  it('stops at the shorter tuple, at the type level', () => {
    expectTypeOf<Zip<[1, 2], ['a', 'b', 'c']>>().toEqualTypeOf<[[1, 'a'], [2, 'b']]>()
    expectTypeOf<Zip<[], []>>().toEqualTypeOf<[]>()
    expectTypeOf<Zip<[1], []>>().toEqualTypeOf<[]>()
  })

  it('zip (runtime) pairs elements and stops at the shorter array', () => {
    expect(zip([1, 2, 3], ['a', 'b', 'c'])).toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ])
    expect(zip([1, 2], ['a', 'b', 'c'])).toEqual([
      [1, 'a'],
      [2, 'b'],
    ])
    expect(zip([], [])).toEqual([])
    expect(zip([0], [''])).toEqual([[0, '']])   // falsy values still pair
    expectTypeOf(zip([1, 2], ['a', 'b'])).toEqualTypeOf<ReadonlyArray<readonly [number, string]>>()
  })
})

describe('capstone-c — Flatten', () => {
  it('fully flattens an arbitrarily nested tuple type', () => {
    expectTypeOf<Flatten<[1, [2, 3], [4, [5, 6]]]>>().toEqualTypeOf<[1, 2, 3, 4, 5, 6]>()
    expectTypeOf<Flatten<[1, 2, 3]>>().toEqualTypeOf<[1, 2, 3]>()
    expectTypeOf<Flatten<[]>>().toEqualTypeOf<[]>()
    expectTypeOf<Flatten<[[[1]]]>>().toEqualTypeOf<[1]>()
  })

  it('flatten (runtime) deep-flattens a nested array', () => {
    expect(flatten([1, [2, 3], [4, [5, 6]]])).toEqual([1, 2, 3, 4, 5, 6])
    expect(flatten([1, 2, 3])).toEqual([1, 2, 3])
    expect(flatten([])).toEqual([])
    expect(flatten([[], []])).toEqual([])
    expect(flatten([0, [0, [0]]])).toEqual([0, 0, 0])   // falsy leaves survive
  })
})

describe('capstone-c — RequiredKeys / OptionalKeys', () => {
  it('splits an object type into its required and optional keys', () => {
    interface Config {
      host: string
      port: number
      timeout?: number
      retries?: number
    }
    expectTypeOf<RequiredKeys<Config>>().toEqualTypeOf<'host' | 'port'>()
    expectTypeOf<OptionalKeys<Config>>().toEqualTypeOf<'timeout' | 'retries'>()
  })
})
