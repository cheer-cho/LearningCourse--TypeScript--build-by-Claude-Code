import { describe, expect, expectTypeOf, it } from 'vitest'
import { TypedEmitter, type AppEvents } from './ex04'

describe('ex11/ex04 — typed event emitter', () => {
  it('listeners receive the payload typed per event name', () => {
    const emitter = new TypedEmitter<AppEvents>()
    const seen: string[] = []
    emitter.on('login', (payload) => {
      expectTypeOf(payload).toEqualTypeOf<{ userId: string }>()
      seen.push(payload.userId)
    })
    emitter.on('message', (payload) => {
      expectTypeOf(payload).toEqualTypeOf<{ from: string; text: string }>()
      seen.push(payload.text)
    })
    emitter.emit('login', { userId: 'u1' })
    emitter.emit('message', { from: 'ada', text: 'hi' })
    expect(seen).toEqual(['u1', 'hi'])
  })

  it('multiple listeners for one event all fire, in order', () => {
    const emitter = new TypedEmitter<AppEvents>()
    const calls: string[] = []
    emitter.on('logout', (p) => calls.push(`first:${p.reason}`))
    emitter.on('logout', (p) => calls.push(`second:${p.reason}`))
    emitter.emit('logout', { reason: 'timeout' })
    expect(calls).toEqual(['first:timeout', 'second:timeout'])
  })

  it('off removes exactly the given callback', () => {
    const emitter = new TypedEmitter<AppEvents>()
    const calls: string[] = []
    const keep = (p: { userId: string }) => calls.push(`keep:${p.userId}`)
    const drop = (p: { userId: string }) => calls.push(`drop:${p.userId}`)
    emitter.on('login', keep)
    emitter.on('login', drop)
    emitter.off('login', drop)
    emitter.emit('login', { userId: 'u2' })
    expect(calls).toEqual(['keep:u2'])
  })

  it('emitting an event nobody listens to is a no-op', () => {
    const emitter = new TypedEmitter<AppEvents>()
    expect(() => emitter.emit('logout', { reason: 'quit' })).not.toThrow()
    // off on an unregistered callback, or an event with no listeners, is also a no-op
    expect(() => emitter.off('logout', () => {})).not.toThrow()
    const noop = (p: { userId: string }) => p
    emitter.on('login', noop)
    expect(() => emitter.off('login', () => {})).not.toThrow()
    expect(() => emitter.emit('login', { userId: 'u9' })).not.toThrow()
  })

  it('wrong payloads and unknown events do not compile', () => {
    const emitter = new TypedEmitter<AppEvents>()
    const attempts = () => {
      // @ts-expect-error — that's the logout payload, not login's
      emitter.emit('login', { reason: 'nope' })
      // @ts-expect-error — 'signup' is not a key of AppEvents
      emitter.on('signup', () => {})
    }
    expect(typeof attempts).toBe('function')
  })
})
