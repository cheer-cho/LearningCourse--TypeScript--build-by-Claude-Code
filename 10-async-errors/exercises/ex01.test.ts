import { describe, expect, expectTypeOf, it } from 'vitest'
import { double, fetchUser, type FetchedUser, type Flattened, type User } from './ex01'

describe('ex10/ex01 — Promise<T> and Awaited<T>', () => {
  it('fetchUser resolves to a User and is typed Promise<User>', async () => {
    await expect(fetchUser(7)).resolves.toEqual({ id: 7, name: 'user-7' })
    await expect(fetchUser(1)).resolves.toEqual({ id: 1, name: 'user-1' })
    await expect(fetchUser(0)).resolves.toEqual({ id: 0, name: 'user-0' })
    expectTypeOf(fetchUser).toEqualTypeOf<(id: number) => Promise<User>>()
  })

  it('double is async — the return is a Promise even without annotation', async () => {
    await expect(double(21)).resolves.toBe(42)
    await expect(double(0)).resolves.toBe(0)
    expectTypeOf(double).toEqualTypeOf<(n: number) => Promise<number>>()
  })

  it('FetchedUser is the resolved type of fetchUser', () => {
    expectTypeOf<FetchedUser>().toEqualTypeOf<User>()
  })

  it('Flattened unwraps every Promise layer of Nested', () => {
    expectTypeOf<Flattened>().toEqualTypeOf<{ ok: boolean }>()
  })
})
