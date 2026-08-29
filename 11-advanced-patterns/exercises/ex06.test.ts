import { describe, expect, expectTypeOf, it, vi } from 'vitest'
import { request, type ParamNames, type PathParams, type Routes } from './ex06'

describe('ex11/ex06 — type-safe API client', () => {
  it('ParamNames extracts every :param from a path string', () => {
    expectTypeOf<ParamNames<'/users/:id'>>().toEqualTypeOf<'id'>()
    expectTypeOf<ParamNames<'/users/:userId/posts/:postId'>>().toEqualTypeOf<'userId' | 'postId'>()
    expectTypeOf<ParamNames<'/health'>>().toEqualTypeOf<never>()
  })

  it('PathParams builds the params object from the path', () => {
    expectTypeOf<PathParams<'/users/:id'>>().toEqualTypeOf<{ id: string }>()
    expectTypeOf<PathParams<'/users/:userId/posts/:postId'>>().toEqualTypeOf<{ userId: string; postId: string }>()
    expectTypeOf<PathParams<'/health'>>().toEqualTypeOf<{}>()
  })

  it('request substitutes params into the URL', async () => {
    const fetcher = vi.fn(async (_url: string): Promise<unknown> => ({ id: '7', name: 'Ada' }))
    await request(fetcher, '/users/:id', { id: '7' })
    expect(fetcher).toHaveBeenCalledWith('/users/7')
    await request(fetcher, '/users/:userId/posts/:postId', { userId: '7', postId: '42' })
    expect(fetcher).toHaveBeenCalledWith('/users/7/posts/42')
    // a path with no params is passed through unchanged
    await request(fetcher, '/health', {})
    expect(fetcher).toHaveBeenCalledWith('/health')
  })

  it('the response type is inferred from the route key', async () => {
    const fetcher = async (_url: string): Promise<unknown> => ({ id: '7', name: 'Ada' })
    const user = await request(fetcher, '/users/:id', { id: '7' })
    expect(user).toEqual({ id: '7', name: 'Ada' })
    expectTypeOf(user).toEqualTypeOf<{ id: string; name: string }>()

    const health = async () => await request(fetcher, '/health', {})
    expectTypeOf(health).returns.resolves.toEqualTypeOf<{ ok: boolean }>()
  })

  it('wrong params and unknown routes do not compile', () => {
    const fetcher = async (_url: string): Promise<unknown> => ({})
    const attempts = () => {
      // @ts-expect-error — the id param is missing
      request(fetcher, '/users/:id', {})
      // @ts-expect-error — '/nope' is not a route
      request(fetcher, '/nope', {})
    }
    expect(typeof attempts).toBe('function')
  })
})
