import { describe, expect, expectTypeOf, it } from 'vitest'
import { z } from 'zod'
import { parseUser, UserSchema, type Result, type User } from './ex03'

describe('ex12/ex03 — zod schemas', () => {
  it('User is derived from the schema, not written by hand', () => {
    expectTypeOf<User>().toEqualTypeOf<{ id: number; name: string; tags: string[] }>()
    expectTypeOf<z.infer<typeof UserSchema>>().toEqualTypeOf<{
      id: number
      name: string
      tags: string[]
    }>()
  })

  it('parseUser returns ok with the typed value on success', () => {
    const r = parseUser({ id: 1, name: 'Ada', tags: ['math'] })
    expect(r).toEqual({ ok: true, value: { id: 1, name: 'Ada', tags: ['math'] } })
    expectTypeOf(parseUser).toEqualTypeOf<(input: unknown) => Result<User, string>>()
    if (r.ok) {
      expectTypeOf(r.value).toEqualTypeOf<User>()
    }
  })

  it('parseUser reports failures as error strings', () => {
    const bad = parseUser({ id: 'one', name: 'Ada', tags: [] })
    expect(bad.ok).toBe(false)
    if (!bad.ok) {
      expect(typeof bad.error).toBe('string')
      expect(bad.error.length).toBeGreaterThan(0)
      expectTypeOf(bad.error).toEqualTypeOf<string>()
    }
    expect(parseUser(null).ok).toBe(false)
    expect(parseUser('nope').ok).toBe(false)
    expect(parseUser({ id: 1, name: 'Ada' }).ok).toBe(false)
  })

  it('parseUser accepts falsy-but-valid field values', () => {
    // 0, '' and [] are all well-typed — validation checks TYPES, not truthiness
    expect(parseUser({ id: 0, name: '', tags: [] })).toEqual({
      ok: true,
      value: { id: 0, name: '', tags: [] },
    })
  })
})
