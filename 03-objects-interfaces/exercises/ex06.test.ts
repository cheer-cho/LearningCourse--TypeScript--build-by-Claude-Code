import { describe, expect, expectTypeOf, it } from 'vitest'
import { makeGlobals, type AppGlobals } from './ex06'

describe('ex03/ex06 — declaration merging', () => {
  it('AppGlobals merged both declarations', () => {
    expectTypeOf<AppGlobals>().toEqualTypeOf<{ appName: string; version: string }>()
  })

  it('makeGlobals provides the merged shape', () => {
    const globals = makeGlobals()
    expect(globals.appName).toBe('mastery')
    expect(typeof globals.version).toBe('string')
  })
})
