/**
 * ex06 — Declaration-driven design: a paginated list fetcher
 *
 * Real features often start with the TYPES: agree on the shape of the
 * problem before writing a line of logic. The types below are already
 * decided — implement functions that satisfy them exactly.
 *
 * Given:
 *   Page<T>       — one page of results plus a cursor for the next page
 *                    (null once there are no more pages).
 *   FetchPage<T>   — fetches ONE page given a cursor (undefined means
 *                    "the first page").
 *
 * 1. fetchAllPages(fetchPage): call fetchPage repeatedly, starting with
 *    cursor = undefined and following each page's nextCursor, collecting
 *    every item across every page until nextCursor is null. Returns all
 *    items in order.
 * 2. takeUntil(fetchPage, predicate): like fetchAllPages, but stops
 *    fetching further pages as soon as `predicate` matches an item — that
 *    item IS included in the result, nothing after it is, and no page
 *    after it is fetched.
 *
 * Check: npm test -- 12 -t ex06
 */

// Given — do not change.
export type Page<T> = {
  items: T[]
  nextCursor: string | null
}

export type FetchPage<T> = (cursor?: string) => Promise<Page<T>>

// TODO: (fetchPage: FetchPage<T>) => Promise<T[]>
export async function fetchAllPages<T>(fetchPage: any): Promise<any> {
  throw new Error('TODO: implement fetchAllPages')
}

// TODO: (fetchPage: FetchPage<T>, predicate: (item: T) => boolean) => Promise<T[]>
export async function takeUntil<T>(fetchPage: any, predicate: any): Promise<any> {
  throw new Error('TODO: implement takeUntil')
}
