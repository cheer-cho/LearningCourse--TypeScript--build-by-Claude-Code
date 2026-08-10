import { describe, expect, expectTypeOf, it } from 'vitest'
import {
  assertIncoming,
  handle,
  isChat,
  transcript,
  type ChatMessage,
  type Incoming,
} from './checkpoint'

describe('✦ checkpoint 5 — unions & narrowing', () => {
  it('Incoming models the four message variants', () => {
    expectTypeOf<ChatMessage>().toEqualTypeOf<{ type: 'chat'; user: string; text: string }>()
    expectTypeOf<Incoming>().toEqualTypeOf<
      | { type: 'join'; user: string }
      | { type: 'chat'; user: string; text: string }
      | { type: 'leave'; user: string }
      | { type: 'ping'; sentAt: number }
    >()
  })

  it('isChat is a type predicate for the chat variant', () => {
    expect(isChat({ type: 'chat', user: 'ada', text: 'hi' })).toBe(true)
    expect(isChat({ type: 'join', user: 'ada' })).toBe(false)
    expectTypeOf(isChat).toEqualTypeOf<(msg: Incoming) => msg is ChatMessage>()
  })

  it('assertIncoming validates unknown input at runtime', () => {
    expect(() => assertIncoming({ type: 'ping', sentAt: 7 })).not.toThrow()
    expect(() => assertIncoming({ type: 'chat', user: 'ada', text: 'hi' })).not.toThrow()
    expect(() => assertIncoming(null)).toThrow()
    expect(() => assertIncoming('ping')).toThrow()
    expect(() => assertIncoming({})).toThrow()
    expect(() => assertIncoming({ type: 'selfdestruct' })).toThrow()
    expect(() => assertIncoming({ type: 'chat', user: 'ada' })).toThrow()
    expect(() => assertIncoming({ type: 'join', user: 42 })).toThrow()
    expect(() => assertIncoming({ type: 'ping', sentAt: 'now' })).toThrow()
    expectTypeOf(assertIncoming).toEqualTypeOf<(value: unknown) => asserts value is Incoming>()
  })

  it('assertIncoming narrows unknown across the call', () => {
    const raw: unknown = JSON.parse('{"type":"ping","sentAt":1}')
    assertIncoming(raw)
    expectTypeOf<typeof raw>().toEqualTypeOf<
      | { type: 'join'; user: string }
      | { type: 'chat'; user: string; text: string }
      | { type: 'leave'; user: string }
      | { type: 'ping'; sentAt: number }
    >()
  })

  it('handle answers every variant exhaustively', () => {
    expect(handle({ type: 'join', user: 'ada' })).toBe('ada joined')
    expect(handle({ type: 'chat', user: 'ada', text: 'hi' })).toBe('ada: hi')
    expect(handle({ type: 'leave', user: 'ada' })).toBe('ada left')
    expect(handle({ type: 'ping', sentAt: 99 })).toBe('pong 99')
    expectTypeOf(handle).toEqualTypeOf<(msg: Incoming) => string>()
  })

  it('transcript keeps only the chat lines', () => {
    const msgs: Incoming[] = [
      { type: 'join', user: 'ada' },
      { type: 'chat', user: 'ada', text: 'hi' },
      { type: 'ping', sentAt: 1 },
      { type: 'chat', user: 'bob', text: 'yo' },
      { type: 'leave', user: 'ada' },
    ]
    expect(transcript(msgs)).toEqual(['ada: hi', 'bob: yo'])
    expect(transcript([])).toEqual([])
    expectTypeOf(transcript).toEqualTypeOf<(msgs: Incoming[]) => string[]>()
  })
})
