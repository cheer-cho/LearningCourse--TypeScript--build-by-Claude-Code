import { describe, expect, expectTypeOf, it } from 'vitest'
import { describeBook, type Book } from './ex01'

describe('ex03/ex01 — object types & optional props', () => {
  it('Book has title, pages, and an optional author', () => {
    expectTypeOf<Book>().toEqualTypeOf<{
      title: string
      pages: number
      author?: string
    }>()
  })

  it('describeBook handles present and absent author', () => {
    expect(describeBook({ title: 'TS', pages: 300, author: 'Ada' })).toBe('TS (300p) by Ada')
    expect(describeBook({ title: 'JS', pages: 200 })).toBe('JS (200p) by unknown')
    expectTypeOf(describeBook).parameter(0).toEqualTypeOf<Book>()
  })
})
