import { describe, expect, expectTypeOf, it } from 'vitest'
import { describeFailure, getErrorMessage } from './ex04'

describe('ex10/ex04 — narrowing unknown errors', () => {
  it('takes unknown and returns string', () => {
    expectTypeOf(getErrorMessage).toEqualTypeOf<(e: unknown) => string>()
  })

  it('extracts the message from Error instances', () => {
    expect(getErrorMessage(new Error('boom'))).toBe('boom')
    expect(getErrorMessage(new TypeError('bad type'))).toBe('bad type')
    // an empty message is the real message, not a missing one
    expect(getErrorMessage(new Error(''))).toBe('')
  })

  it('returns thrown strings as-is', () => {
    expect(getErrorMessage('plain string')).toBe('plain string')
    expect(getErrorMessage('')).toBe('')
  })

  it('reads .message from message-shaped objects — but only string ones', () => {
    expect(getErrorMessage({ message: 'from an object' })).toBe('from an object')
    expect(getErrorMessage({ message: 404 })).toBe('[object Object]')
    expect(getErrorMessage({ message: '' })).toBe('')
  })

  it('falls back to String(e) for everything else', () => {
    expect(getErrorMessage(42)).toBe('42')
    expect(getErrorMessage(null)).toBe('null')
    expect(getErrorMessage(undefined)).toBe('undefined')
    expect(getErrorMessage(0)).toBe('0')
    expect(getErrorMessage(false)).toBe('false')
  })

  it('describeFailure reports ok or the extracted message', async () => {
    await expect(describeFailure(async () => 'fine')).resolves.toBe('ok')
    await expect(
      describeFailure(async () => {
        throw new Error('db down')
      }),
    ).resolves.toBe('db down')
    await expect(
      describeFailure(async () => {
        throw 'raw string'
      }),
    ).resolves.toBe('raw string')
    expectTypeOf(describeFailure).toEqualTypeOf<(fn: () => Promise<unknown>) => Promise<string>>()
  })
})
