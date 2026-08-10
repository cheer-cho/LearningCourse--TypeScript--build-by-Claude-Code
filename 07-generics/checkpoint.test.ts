import { describe, expect, expectTypeOf, it } from 'vitest'
import { err, firstWhere, ok, Store, type Result } from './checkpoint'

type Product = { id: number; title: string; price: number }

describe('✦ checkpoint 7 — generics', () => {
  it('Result defaults its error type to string', () => {
    expectTypeOf<Result<boolean>>().toEqualTypeOf<
      { ok: true; value: boolean } | { ok: false; error: string }
    >()
    expectTypeOf<Result<number, Error>>().toEqualTypeOf<
      { ok: true; value: number } | { ok: false; error: Error }
    >()
  })

  it('ok and err build the two arms', () => {
    const success = ok<number>(42)
    expect(success).toEqual({ ok: true, value: 42 })
    expectTypeOf(success).toEqualTypeOf<Result<number, never>>()

    const failure = err<string>('nope')
    expect(failure).toEqual({ ok: false, error: 'nope' })
    expectTypeOf(failure).toEqualTypeOf<Result<never, string>>()
  })

  it('firstWhere finds a match as a Result', () => {
    const found = firstWhere([3, 8, 2], (n) => n > 5)
    expect(found).toEqual({ ok: true, value: 8 })
    expectTypeOf(found).toEqualTypeOf<Result<number>>()
    expect(firstWhere([1, 2], (n) => n > 10)).toEqual({ ok: false, error: 'not found' })

    const frozen: readonly string[] = ['a', 'bb']
    expect(firstWhere(frozen, (s) => s.length === 2)).toEqual({ ok: true, value: 'bb' })
  })

  it('Store adds and gets items by id', () => {
    const store = new Store<Product>()
    store.add({ id: 1, title: 'Tea', price: 4 })
    const added = store.add({ id: 2, title: 'Coffee', price: 6 })
    expect(added).toEqual({ id: 2, title: 'Coffee', price: 6 })
    expectTypeOf(added).toEqualTypeOf<Product>()

    expect(store.get(1)).toEqual({ ok: true, value: { id: 1, title: 'Tea', price: 4 } })
    expect(store.get(99)).toEqual({ ok: false, error: 'not found' })
    expectTypeOf(store.get(2)).toEqualTypeOf<Result<Product>>()
  })

  it('Store exposes items readonly and plucks typed columns', () => {
    const store = new Store<Product>()
    store.add({ id: 1, title: 'Tea', price: 4 })
    store.add({ id: 2, title: 'Coffee', price: 6 })

    expect(store.getAll()).toEqual([
      { id: 1, title: 'Tea', price: 4 },
      { id: 2, title: 'Coffee', price: 6 },
    ])
    expectTypeOf(store.getAll()).toEqualTypeOf<readonly Product[]>()

    const titles = store.pluck('title')
    expect(titles).toEqual(['Tea', 'Coffee'])
    expectTypeOf(titles).toEqualTypeOf<string[]>()
    expect(store.pluck('price')).toEqual([4, 6])
  })

  it('Store rejects item types without a numeric id', () => {
    // @ts-expect-error — Store items must have a numeric id
    new Store<{ title: string }>()
  })
})
