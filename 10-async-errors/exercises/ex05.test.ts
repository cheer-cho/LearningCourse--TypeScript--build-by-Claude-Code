import { describe, expect, expectTypeOf, it } from 'vitest'
import { HttpError, isHttpError, messageChain } from './ex05'

describe('ex10/ex05 — custom error classes & cause', () => {
  it('HttpError carries status and url with the right types', () => {
    const err = new HttpError(404, '/users/1')
    expect(err.status).toBe(404)
    expect(err.url).toBe('/users/1')
    expectTypeOf(err.status).toEqualTypeOf<number>()
    expectTypeOf(err.url).toEqualTypeOf<string>()
    expectTypeOf(HttpError).constructorParameters.toEqualTypeOf<
      [status: number, url: string, cause?: unknown]
    >()
  })

  it('HttpError builds its message and name, and is a real Error', () => {
    const err = new HttpError(404, '/users/1')
    expect(err.message).toBe('HTTP 404 for /users/1')
    expect(err.name).toBe('HttpError')
    expect(err).toBeInstanceOf(Error)
    expect(err).toBeInstanceOf(HttpError)
  })

  it('HttpError forwards the cause', () => {
    const root = new Error('socket closed')
    expect(new HttpError(502, '/x', root).cause).toBe(root)
    expect(new HttpError(502, '/x').cause).toBeUndefined()
  })

  it('isHttpError narrows unknown to HttpError', () => {
    const mystery: unknown = new HttpError(404, '/users/1')
    expect(isHttpError(mystery)).toBe(true)
    expect(isHttpError(new Error('plain'))).toBe(false)
    expect(isHttpError('nope')).toBe(false)
    if (isHttpError(mystery)) {
      expectTypeOf(mystery).toEqualTypeOf<HttpError>()
      expect((mystery as HttpError).status).toBe(404)
    }
  })

  it('messageChain walks the cause chain', () => {
    const chain = new HttpError(500, '/report', new Error('db down', { cause: new Error('socket closed') }))
    expect(messageChain(chain)).toEqual(['HTTP 500 for /report', 'db down', 'socket closed'])
    expect(messageChain(new Error('single'))).toEqual(['single'])
    expect(messageChain('not an error')).toEqual([])
    expectTypeOf(messageChain).toEqualTypeOf<(e: unknown) => string[]>()
  })
})
