import { describe, expect, expectTypeOf, it } from 'vitest'
import { z } from 'zod'
import { loadSettings, SettingsSchema, type Result, type Settings } from './checkpoint'

describe('✦ checkpoint 12 — real-world typescript', () => {
  it('Settings is fully resolved: apiUrl is required, not optional', () => {
    expectTypeOf<Settings>().toEqualTypeOf<{
      apiUrl: string
      retries: number
      featureFlags: string[]
    }>()
  })

  it('SettingsSchema derives a type where apiUrl is OPTIONAL (unlike Settings)', () => {
    expectTypeOf<z.infer<typeof SettingsSchema>>().toEqualTypeOf<{
      apiUrl?: string
      retries: number
      featureFlags: string[]
    }>()
  })

  it('loadSettings is typed with an optional env parameter, returning a Result', () => {
    expectTypeOf(loadSettings).toEqualTypeOf<
      (text: string, env?: Record<string, string | undefined>) => Result<Settings, string>
    >()
  })

  it('loadSettings: valid JSON with apiUrl already present', () => {
    const text = JSON.stringify({ apiUrl: 'https://api.example.com', retries: 3, featureFlags: ['beta'] })
    const r = loadSettings(text, {})
    expect(r).toEqual({
      ok: true,
      value: { apiUrl: 'https://api.example.com', retries: 3, featureFlags: ['beta'] },
    })
    if (r.ok) {
      expectTypeOf(r.value).toEqualTypeOf<Settings>()
    }
  })

  it('loadSettings: apiUrl missing from JSON falls back to env.API_URL', () => {
    const text = JSON.stringify({ retries: 0, featureFlags: [] })
    const r = loadSettings(text, { API_URL: 'https://from-env.example.com' })
    expect(r).toEqual({
      ok: true,
      value: { apiUrl: 'https://from-env.example.com', retries: 0, featureFlags: [] },
    })
  })

  it('loadSettings: apiUrl missing everywhere is a Result error, not a throw', () => {
    const text = JSON.stringify({ retries: 0, featureFlags: [] })
    const attempt = () => loadSettings(text, {})
    expect(attempt).not.toThrow()
    expect(loadSettings(text, {})).toEqual({ ok: false, error: 'Missing required env var: API_URL' })
  })

  it('loadSettings: invalid JSON is a Result error, not a throw', () => {
    const attempt = () => loadSettings('{not valid', {})
    expect(attempt).not.toThrow()
    const r = loadSettings('{not valid', {})
    expect(r.ok).toBe(false)
    if (!r.ok) {
      expect(typeof r.error).toBe('string')
      expect(r.error.length).toBeGreaterThan(0)
    }
  })

  it('loadSettings: schema violations are a Result error', () => {
    const text = JSON.stringify({ retries: -1, featureFlags: [] })
    const r = loadSettings(text, { API_URL: 'https://x.example.com' })
    expect(r.ok).toBe(false)
    if (!r.ok) {
      expect(typeof r.error).toBe('string')
    }
  })

  it('loadSettings defaults env to process.env', () => {
    process.env['API_URL'] = 'https://from-process-env.example.com'
    try {
      const text = JSON.stringify({ retries: 1, featureFlags: [] })
      const r = loadSettings(text)
      expect(r).toEqual({
        ok: true,
        value: { apiUrl: 'https://from-process-env.example.com', retries: 1, featureFlags: [] },
      })
    } finally {
      delete process.env['API_URL']
    }
  })
})
