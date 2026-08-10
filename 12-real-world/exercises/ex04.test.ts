import { describe, expect, expectTypeOf, it } from 'vitest'
import { safeJsonParse, type JsonValue, type Result } from './ex04'

describe('ex12/ex04 — JSON: recursive type and safe parse', () => {
  it('JsonValue is the recursive JSON shape', () => {
    expectTypeOf<JsonValue>().toEqualTypeOf<
      string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }
    >()
  })

  it('JsonValue accepts primitives, nested arrays, and nested objects', () => {
    const a: JsonValue = 'hi'
    const b: JsonValue = 42
    const c: JsonValue = true
    const d: JsonValue = null
    const e: JsonValue = [1, 'two', false, null, { nested: true }]
    const f: JsonValue = { a: 1, b: { c: [1, 2, 'three'] } }
    expect([a, b, c, d, e, f]).toHaveLength(6)
  })

  it('safeJsonParse returns ok with the parsed value on valid JSON', () => {
    const r = safeJsonParse('{"a":1,"b":[1,2,3],"c":null}')
    expect(r).toEqual({ ok: true, value: { a: 1, b: [1, 2, 3], c: null } })
    expectTypeOf(safeJsonParse).toEqualTypeOf<(text: string) => Result<JsonValue, string>>()
    if (r.ok) {
      expectTypeOf(r.value).toEqualTypeOf<JsonValue>()
    }
  })

  it('safeJsonParse parses top-level primitives too', () => {
    expect(safeJsonParse('42')).toEqual({ ok: true, value: 42 })
    expect(safeJsonParse('"hello"')).toEqual({ ok: true, value: 'hello' })
    expect(safeJsonParse('null')).toEqual({ ok: true, value: null })
  })

  it('safeJsonParse returns a non-empty error string on invalid JSON, never throws', () => {
    const attempt = () => safeJsonParse('{not valid')
    expect(attempt).not.toThrow()
    const r = safeJsonParse('{not valid')
    expect(r.ok).toBe(false)
    if (!r.ok) {
      expect(typeof r.error).toBe('string')
      expect(r.error.length).toBeGreaterThan(0)
    }
  })
})
