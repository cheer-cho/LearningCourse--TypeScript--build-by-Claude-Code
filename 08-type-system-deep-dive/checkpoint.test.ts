import { describe, expect, expectTypeOf, it } from 'vitest'
import { EventBus, EVENT_NAMES, type Events, type ListenerMap, type OnEventName, type PayloadOf } from './checkpoint'

describe('✦ checkpoint 8 — type system deep dive', () => {
  it('ListenerMap maps each event key to its handler signature', () => {
    expectTypeOf<ListenerMap<Events>>().toEqualTypeOf<{
      login: (payload: { user: string }) => void
      logout: (payload: undefined) => void
    }>()
  })

  it('OnEventName remaps a key to its onX form', () => {
    expectTypeOf<OnEventName<'login'>>().toEqualTypeOf<'onLogin'>()
    expectTypeOf<OnEventName<'logout'>>().toEqualTypeOf<'onLogout'>()
  })

  it('PayloadOf extracts the payload type from a handler', () => {
    expectTypeOf<PayloadOf<(payload: number) => void>>().toEqualTypeOf<number>()
    expectTypeOf<PayloadOf<(payload: { user: string }) => void>>().toEqualTypeOf<{ user: string }>()
  })

  it('EVENT_NAMES stays a literal tuple validated against Events keys', () => {
    expect(EVENT_NAMES).toEqual(['login', 'logout'])
    expectTypeOf(EVENT_NAMES).toEqualTypeOf<readonly ['login', 'logout']>()
  })

  it('EventBus registers and emits to handlers in registration order', () => {
    const bus = new EventBus<Events>()
    const calls: string[] = []
    bus.on('login', (payload) => calls.push(`first:${payload.user}`))
    bus.on('login', (payload) => calls.push(`second:${payload.user}`))
    bus.emit('login', { user: 'Ada' })
    expect(calls).toEqual(['first:Ada', 'second:Ada'])

    let logoutCalls = 0
    bus.on('logout', () => {
      logoutCalls++
    })
    bus.emit('logout', undefined)
    expect(logoutCalls).toBe(1)
  })

  it('EventBus rejects unknown event names', () => {
    const bus = new EventBus<Events>()
    // @ts-expect-error — 'unknown-event' is not a key of Events
    bus.on('unknown-event', () => {})
  })
})
