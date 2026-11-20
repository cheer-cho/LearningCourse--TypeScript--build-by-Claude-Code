// Reference solution — ex01

export interface User {
  id: number
  name: string
}

export type Nested = Promise<Promise<{ ok: boolean }>>

export async function fetchUser(id: number): Promise<User> {
  return { id, name: `user-${id}` }
}

export async function double(n: number) {
  return n * 2
}

export type FetchedUser = Awaited<ReturnType<typeof fetchUser>>

export type Flattened = Awaited<Nested>
