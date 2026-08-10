import { describe, expect, expectTypeOf, it, vi } from 'vitest'
import { z } from 'zod'
import {
  apiClient,
  type ApiError,
  type ApiSchema,
  type FetchResponse,
  type ParamNamesOf,
  type RequestOptionsFor,
  type Result,
} from './capstone-b-fetch-wrapper'

const UserSchema = z.object({ id: z.string(), name: z.string() })
type UserT = z.infer<typeof UserSchema>

const schema = {
  'GET /users': { response: z.array(UserSchema) },
  'GET /users/:id': { response: UserSchema },
  'POST /users': { response: UserSchema, body: z.object({ name: z.string() }) },
} satisfies ApiSchema

function fakeResponse(status: number, body: unknown): FetchResponse {
  return { ok: status >= 200 && status < 300, status, json: async () => body }
}

// A vi.fn() typed exactly like FetchImpl — so `.mock.calls` keeps its
// (url, init) shape instead of collapsing to an empty tuple.
function mockFetch(status: number, body: unknown) {
  return vi.fn(async (_url: string, _init: { method: string; body?: string }) => fakeResponse(status, body))
}

describe('capstone-b — ParamNamesOf parses the endpoint key', () => {
  it('extracts :param names from the path portion only', () => {
    expectTypeOf<ParamNamesOf<'GET /users'>>().toEqualTypeOf<never>()
    expectTypeOf<ParamNamesOf<'GET /users/:id'>>().toEqualTypeOf<'id'>()
    expectTypeOf<ParamNamesOf<'POST /users/:a/:b'>>().toEqualTypeOf<'a' | 'b'>()
  })
})

describe('capstone-b — RequestOptionsFor combines params and body', () => {
  it('is {} when neither params nor body are needed', () => {
    expectTypeOf<RequestOptionsFor<typeof schema, 'GET /users'>>().toEqualTypeOf<{}>()
  })

  it('requires exactly the path params, typed as strings', () => {
    expectTypeOf<RequestOptionsFor<typeof schema, 'GET /users/:id'>>().toEqualTypeOf<{
      readonly params: { readonly id: string }
    }>()
  })

  it('requires the body, typed from the schema', () => {
    expectTypeOf<RequestOptionsFor<typeof schema, 'POST /users'>>().toEqualTypeOf<{
      readonly body: { name: string }
    }>()
  })
})

describe('capstone-b — request infers a precise response type per key', () => {
  it('GET /users resolves to an array of users', async () => {
    const fetchImpl = mockFetch(200, [{ id: '1', name: 'Ada' }])
    const client = apiClient(schema, fetchImpl)
    const result = await client.request('GET /users', {})
    expect(result).toEqual({ ok: true, value: [{ id: '1', name: 'Ada' }] })
    expect(fetchImpl).toHaveBeenCalledWith('/users', { method: 'GET' })
    expectTypeOf(result).toEqualTypeOf<Result<UserT[], ApiError>>()
  })

  it('GET /users/:id substitutes the param and resolves to one user', async () => {
    const fetchImpl = mockFetch(200, { id: '7', name: 'Grace' })
    const client = apiClient(schema, fetchImpl)
    const result = await client.request('GET /users/:id', { params: { id: '7' } })
    expect(result).toEqual({ ok: true, value: { id: '7', name: 'Grace' } })
    expect(fetchImpl).toHaveBeenCalledWith('/users/7', { method: 'GET' })
    expectTypeOf(result).toEqualTypeOf<Result<UserT, ApiError>>()
  })

  it('POST /users forwards a JSON body and resolves to the created user', async () => {
    const fetchImpl = mockFetch(201, { id: '9', name: 'Ada' })
    const client = apiClient(schema, fetchImpl)
    const result = await client.request('POST /users', { body: { name: 'Ada' } })
    expect(result).toEqual({ ok: true, value: { id: '9', name: 'Ada' } })
    expect(fetchImpl).toHaveBeenCalledWith('/users', { method: 'POST', body: JSON.stringify({ name: 'Ada' }) })
    expectTypeOf(result).toEqualTypeOf<Result<UserT, ApiError>>()
  })
})

describe('capstone-b — errors are typed values, never thrown', () => {
  it('a non-ok HTTP response becomes err({ kind: "http" })', async () => {
    const fetchImpl = mockFetch(404, { message: 'not found' })
    const client = apiClient(schema, fetchImpl)
    const result = await client.request('GET /users/:id', { params: { id: 'ghost' } })
    expect(result).toEqual({ ok: false, error: { kind: 'http', status: 404 } })
  })

  it('a body that fails validation becomes err({ kind: "validation" })', async () => {
    const fetchImpl = mockFetch(200, [{ id: 1, name: 'Ada' }]) // id should be a string
    const client = apiClient(schema, fetchImpl)
    const result = await client.request('GET /users', {})
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toEqual({ kind: 'validation', message: expect.any(String) })
    }
  })

  it('the real network is never touched — fetchImpl is always the injected fake', async () => {
    const fetchImpl = mockFetch(200, [{ id: '1', name: 'Ada' }])
    const client = apiClient(schema, fetchImpl)
    await client.request('GET /users', {})
    expect(fetchImpl).toHaveBeenCalledTimes(1)
    expect(fetchImpl.mock.calls[0]?.[0]).toBe('/users')
  })
})

describe('capstone-b — wrong usage does not compile', () => {
  it('missing params, missing body, and unknown keys are compile errors', () => {
    const fetchImpl = mockFetch(200, {})
    const client = apiClient(schema, fetchImpl)
    const attempts = () => {
      // @ts-expect-error — GET /users/:id requires params.id
      client.request('GET /users/:id', {})
      // @ts-expect-error — POST /users requires a body
      client.request('POST /users', {})
      // @ts-expect-error — not a key of the schema
      client.request('DELETE /users/:id', { params: { id: '1' } })
    }
    expect(typeof attempts).toBe('function')
  })
})
