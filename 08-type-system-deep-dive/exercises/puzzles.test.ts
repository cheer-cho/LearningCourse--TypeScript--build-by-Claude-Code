import { describe, expectTypeOf, it } from 'vitest'
import type { First, Includes, Length, Push, Replace, Trim, TupleToObject, TupleToUnion } from './puzzles'

describe('puzzles — type-challenges warm-up', () => {
  it('First returns the first tuple element, or never when empty', () => {
    expectTypeOf<First<[1, 2, 3]>>().toEqualTypeOf<1>()
    expectTypeOf<First<[]>>().toEqualTypeOf<never>()
  })

  it('Length returns the tuple length as a literal number', () => {
    expectTypeOf<Length<[1, 2, 3]>>().toEqualTypeOf<3>()
    expectTypeOf<Length<[]>>().toEqualTypeOf<0>()
  })

  it('TupleToUnion turns a tuple into a union of its elements', () => {
    expectTypeOf<TupleToUnion<[1, 2, 3]>>().toEqualTypeOf<1 | 2 | 3>()
  })

  it('TupleToObject maps each literal element to a key/value pair', () => {
    expectTypeOf<TupleToObject<['a', 'b']>>().toEqualTypeOf<{ a: 'a'; b: 'b' }>()
  })

  it('Includes checks membership by exact type equality', () => {
    expectTypeOf<Includes<[1, 2, 3], 2>>().toEqualTypeOf<true>()
    expectTypeOf<Includes<[1, 2, 3], 4>>().toEqualTypeOf<false>()
    expectTypeOf<Includes<['a', 'b'], string>>().toEqualTypeOf<false>()
  })

  it('Push appends an element to the end of a tuple', () => {
    expectTypeOf<Push<[1, 2], 3>>().toEqualTypeOf<[1, 2, 3]>()
    expectTypeOf<Push<[], 'x'>>().toEqualTypeOf<['x']>()
  })

  it('Trim removes leading and trailing whitespace', () => {
    expectTypeOf<Trim<'  hello world  '>>().toEqualTypeOf<'hello world'>()
    expectTypeOf<Trim<'\t\nhi\n'>>().toEqualTypeOf<'hi'>()
  })

  it('Replace substitutes the first occurrence only', () => {
    expectTypeOf<Replace<'foo bar foo', 'foo', 'baz'>>().toEqualTypeOf<'baz bar foo'>()
    expectTypeOf<Replace<'abc', 'x', 'y'>>().toEqualTypeOf<'abc'>()
  })
})
