import { describe, expect, expectTypeOf, it } from 'vitest'
import { dataOrDefault, describeState, type RequestState } from './ex05'

describe('ex05/ex05 — discriminated unions', () => {
  it('RequestState has the four tagged variants', () => {
    expectTypeOf<RequestState>().toEqualTypeOf<
      | { status: 'idle' }
      | { status: 'loading'; startedAt: number }
      | { status: 'success'; data: string }
      | { status: 'error'; message: string }
    >()
  })

  it('describeState narrows on the status tag', () => {
    expect(describeState({ status: 'idle' })).toBe('idle')
    expect(describeState({ status: 'loading', startedAt: 5 })).toBe('loading since 5')
    expect(describeState({ status: 'success', data: 'payload' })).toBe('got: payload')
    expect(describeState({ status: 'error', message: 'boom' })).toBe('error: boom')
    expectTypeOf(describeState).toEqualTypeOf<(state: RequestState) => string>()
  })

  it('dataOrDefault only trusts the success variant', () => {
    expect(dataOrDefault({ status: 'success', data: 'payload' }, 'n/a')).toBe('payload')
    expect(dataOrDefault({ status: 'idle' }, 'n/a')).toBe('n/a')
    expect(dataOrDefault({ status: 'error', message: 'boom' }, 'n/a')).toBe('n/a')
    expectTypeOf(dataOrDefault).toEqualTypeOf<(state: RequestState, fallback: string) => string>()
  })
})
