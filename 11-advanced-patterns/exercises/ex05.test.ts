import { describe, expect, expectTypeOf, it } from 'vitest'
import { freezeConfig, mergeDefaults, type DeepPartial, type DeepReadonly } from './ex05'

interface Profile {
  name: string
  tags: string[]
  settings: { theme: string; notify: boolean }
  posts: Array<{ title: string }>
  greet: () => string
}

interface AppConfig {
  retries: number
  tags: string[]
  ui: { theme: 'light' | 'dark'; fontSize: number }
}

describe('ex11/ex05 — DeepReadonly & DeepPartial', () => {
  it('DeepReadonly recurses into objects and arrays, skips functions', () => {
    expectTypeOf<DeepReadonly<Profile>>().toEqualTypeOf<{
      readonly name: string
      readonly tags: readonly string[]
      readonly settings: { readonly theme: string; readonly notify: boolean }
      readonly posts: readonly { readonly title: string }[]
      readonly greet: () => string
    }>()
  })

  it('DeepPartial makes every level optional, skips functions', () => {
    expectTypeOf<DeepPartial<Profile>>().toEqualTypeOf<{
      name?: string
      tags?: string[]
      settings?: { theme?: string; notify?: boolean }
      posts?: Array<{ title?: string }>
      greet?: () => string
    }>()
  })

  it('primitives and functions pass through unchanged', () => {
    expectTypeOf<DeepReadonly<number>>().toEqualTypeOf<number>()
    expectTypeOf<DeepReadonly<() => void>>().toEqualTypeOf<() => void>()
    expectTypeOf<DeepPartial<string>>().toEqualTypeOf<string>()
    expectTypeOf<DeepPartial<(n: number) => number>>().toEqualTypeOf<(n: number) => number>()
  })

  it('freezeConfig freezes every level at runtime', () => {
    const config = { name: 'app', tags: ['a', 'b'], settings: { theme: 'light', notify: true } }
    const frozen = freezeConfig(config)
    expect(Object.isFrozen(frozen)).toBe(true)
    expect(Object.isFrozen(frozen.settings)).toBe(true)
    expect(Object.isFrozen(frozen.tags)).toBe(true)
    expectTypeOf(frozen.settings).toEqualTypeOf<{ readonly theme: string; readonly notify: boolean }>()
  })

  it('mergeDefaults deep-merges plain objects', () => {
    const defaults: AppConfig = { retries: 3, tags: ['core'], ui: { theme: 'light', fontSize: 14 } }
    const merged = mergeDefaults(defaults, { ui: { theme: 'dark' } })
    expect(merged).toEqual({ retries: 3, tags: ['core'], ui: { theme: 'dark', fontSize: 14 } })
    expect(defaults.ui.theme).toBe('light') // defaults are not mutated
    expectTypeOf(merged).toEqualTypeOf<AppConfig>()
  })

  it('mergeDefaults replaces (not merges) arrays and primitives', () => {
    const defaults: AppConfig = { retries: 3, tags: ['core'], ui: { theme: 'light', fontSize: 14 } }
    const merged = mergeDefaults(defaults, { retries: 5, tags: ['x', 'y'] })
    expect(merged).toEqual({ retries: 5, tags: ['x', 'y'], ui: { theme: 'light', fontSize: 14 } })
  })

  it('a patch with unknown keys or wrong shapes does not compile', () => {
    const defaults: AppConfig = { retries: 3, tags: ['core'], ui: { theme: 'light', fontSize: 14 } }
    const attempt = () => {
      // @ts-expect-error — fontSize must be a number, even in a deep patch
      mergeDefaults(defaults, { ui: { fontSize: 'big' } })
    }
    expect(typeof attempt).toBe('function')
  })
})
