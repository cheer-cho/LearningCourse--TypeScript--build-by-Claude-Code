import { describe, expect, expectTypeOf, it } from 'vitest'
import { emitKeypress } from './ex05'
import type { EventMap } from './ex05-events'

describe('ex09/ex05 — augmenting a module you own', () => {
  it('EventMap gains the keypress event via declare module', () => {
    expectTypeOf<EventMap>().toEqualTypeOf<{
      click: { x: number; y: number }
      keypress: { key: string }
    }>()
  })

  it('emitKeypress emits the merged event', () => {
    expect(emitKeypress('Enter')).toEqual({ key: 'Enter' })
    expectTypeOf(emitKeypress).toEqualTypeOf<(key: string) => { key: string }>()
  })
})
