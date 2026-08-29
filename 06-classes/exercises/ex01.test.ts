import { describe, expect, expectTypeOf, it } from 'vitest'
import { Playlist } from './ex01'

describe('ex06/ex01 — class basics', () => {
  it('constructs with a name and an empty song list', () => {
    const p = new Playlist('Road Trip')
    expect(p.name).toBe('Road Trip')
    expect(p.songs).toEqual([])
    expect(p.size()).toBe(0)
    // each playlist owns its own song list — a shared array would leak
    const other = new Playlist('Other')
    other.add('Solo')
    expect(p.songs).toEqual([])
    expectTypeOf(p.name).toEqualTypeOf<string>()
    expectTypeOf(p.songs).toEqualTypeOf<string[]>()
  })

  it('add pushes songs and size counts them', () => {
    const p = new Playlist('Focus')
    p.add('Weightless')
    p.add('Avril 14th')
    expect(p.songs).toEqual(['Weightless', 'Avril 14th'])
    expect(p.size()).toBe(2)
    expectTypeOf(p.add).toEqualTypeOf<(song: string) => void>()
    expectTypeOf(p.size).toEqualTypeOf<() => number>()
    expect(p.add('Weightless')).toBeUndefined()   // add returns void
    expect(p.size()).toBe(3)                      // duplicates are kept
  })

  it('the constructor takes exactly one string', () => {
    expectTypeOf<ConstructorParameters<typeof Playlist>>().toEqualTypeOf<[name: string]>()
  })
})
