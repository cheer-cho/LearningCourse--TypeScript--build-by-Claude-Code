import { describe, expect, expectTypeOf, it } from 'vitest'
import { fetchAllPages, takeUntil, type FetchPage, type Page } from './ex06'

const makeFetcher = (pages: Page<number>[]): FetchPage<number> => {
  return async (cursor?: string) => {
    const index = cursor === undefined ? 0 : Number(cursor)
    const page = pages[index]
    if (!page) throw new Error(`no page at cursor ${String(cursor)}`)
    return page
  }
}

describe('ex12/ex06 — declaration-driven: paginated list fetcher', () => {
  it('fetchAllPages collects items across every page in order', async () => {
    const fetchPage = makeFetcher([
      { items: [1, 2], nextCursor: '1' },
      { items: [3, 4], nextCursor: '2' },
      { items: [5], nextCursor: null },
    ])
    await expect(fetchAllPages(fetchPage)).resolves.toEqual([1, 2, 3, 4, 5])
    expectTypeOf(fetchAllPages(fetchPage)).resolves.toEqualTypeOf<number[]>()
    expectTypeOf(fetchAllPages<number>).parameter(0).toEqualTypeOf<FetchPage<number>>()
  })

  it('fetchAllPages stops after a single page when nextCursor is null', async () => {
    const fetchPage = makeFetcher([{ items: [9], nextCursor: null }])
    await expect(fetchAllPages(fetchPage)).resolves.toEqual([9])
  })

  it('fetchAllPages returns [] for a first page with no items and no next', async () => {
    const fetchPage = makeFetcher([{ items: [], nextCursor: null }])
    await expect(fetchAllPages(fetchPage)).resolves.toEqual([])
  })

  it('takeUntil includes the matching item but fetches no further pages', async () => {
    let fetchedPages = 0
    const raw = makeFetcher([
      { items: [1, 2], nextCursor: '1' },
      { items: [3, 4], nextCursor: '2' },
      { items: [5, 6], nextCursor: null },
    ])
    const fetchPage: FetchPage<number> = async (cursor) => {
      fetchedPages++
      return raw(cursor)
    }
    await expect(takeUntil(fetchPage, (n: number) => n === 3)).resolves.toEqual([1, 2, 3])
    expect(fetchedPages).toBe(2)
    expectTypeOf(takeUntil(fetchPage, (n: number) => n === 3)).resolves.toEqualTypeOf<number[]>()
    expectTypeOf(takeUntil<number>).parameter(0).toEqualTypeOf<FetchPage<number>>()
    expectTypeOf(takeUntil<number>).parameter(1).toEqualTypeOf<(item: number) => boolean>()
  })

  it('takeUntil returns everything if the predicate never matches', async () => {
    const fetchPage = makeFetcher([
      { items: [1, 2], nextCursor: '1' },
      { items: [3], nextCursor: null },
    ])
    await expect(takeUntil(fetchPage, (n: number) => n > 100)).resolves.toEqual([1, 2, 3])
  })
})
