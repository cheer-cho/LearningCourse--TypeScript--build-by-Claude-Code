// Reference solution — ex06

export type Page<T> = {
  items: T[]
  nextCursor: string | null
}

export type FetchPage<T> = (cursor?: string) => Promise<Page<T>>

export async function fetchAllPages<T>(fetchPage: FetchPage<T>): Promise<T[]> {
  const items: T[] = []
  let cursor: string | undefined = undefined
  for (;;) {
    const page = await fetchPage(cursor)
    items.push(...page.items)
    if (page.nextCursor === null) break
    cursor = page.nextCursor
  }
  return items
}

export async function takeUntil<T>(
  fetchPage: FetchPage<T>,
  predicate: (item: T) => boolean,
): Promise<T[]> {
  const items: T[] = []
  let cursor: string | undefined = undefined
  for (;;) {
    const page = await fetchPage(cursor)
    for (const item of page.items) {
      items.push(item)
      if (predicate(item)) return items
    }
    if (page.nextCursor === null) break
    cursor = page.nextCursor
  }
  return items
}
