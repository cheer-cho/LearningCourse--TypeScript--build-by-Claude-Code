import { describe, expect, expectTypeOf, it } from 'vitest'
import { parseUser, type User } from './ex04'

describe('ex04 — modeling a JSON shape', () => {
  it('User describes the JSON shape exactly', () => {
    expectTypeOf<User>().toEqualTypeOf<{
      id: number
      name: string
      tags: string[]
      active: boolean
    }>()
  })

  it('parseUser round-trips the JSON', () => {
    const user = parseUser('{"id":1,"name":"Ada","tags":["math","code"],"active":true}')
    expect(user).toEqual({ id: 1, name: 'Ada', tags: ['math', 'code'], active: true })
  })

  it('parseUser preserves falsy and empty fields', () => {
    const user = parseUser('{"id":0,"name":"","tags":[],"active":false}')
    expect(user).toEqual({ id: 0, name: '', tags: [], active: false })
  })
})
