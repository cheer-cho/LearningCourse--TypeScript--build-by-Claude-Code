import { readFile } from 'node:fs/promises'
import { describe, expect, expectTypeOf, it } from 'vitest'
import { loadLines, requireEnv, type ReadTextFile } from './ex02'

describe('ex12/ex02 — Node typing', () => {
  it('process.env values are string | undefined', () => {
    expectTypeOf(process.env['ANYTHING_AT_ALL']).toEqualTypeOf<string | undefined>()
  })

  it('requireEnv returns the value or throws with the exact message', () => {
    expect(requireEnv('APP_MODE', { APP_MODE: 'dev' })).toBe('dev')
    expect(() => requireEnv('NOPE', {})).toThrowError('Missing required env var: NOPE')
    // an env var SET to the empty string is present — only undefined is missing
    expect(requireEnv('EMPTY', { EMPTY: '' })).toBe('')
    expect(requireEnv('ZERO', { ZERO: '0' })).toBe('0')
    expect(() => requireEnv('UNSET', { UNSET: undefined })).toThrowError(
      'Missing required env var: UNSET',
    )
    expectTypeOf(requireEnv).toEqualTypeOf<
      (name: string, env?: Record<string, string | undefined>) => string
    >()
  })

  it('requireEnv defaults to the real process.env', () => {
    process.env['EX02_PROBE'] = 'hello'
    try {
      expect(requireEnv('EX02_PROBE')).toBe('hello')
    } finally {
      delete process.env['EX02_PROBE']
    }
  })

  it('ReadTextFile matches readFile(path, "utf8") from node:fs/promises', () => {
    expectTypeOf<ReadTextFile>().toEqualTypeOf<(path: string) => Promise<string>>()
    const real: ReadTextFile = (path: string) => readFile(path, 'utf8')
    expect(typeof real).toBe('function')
  })

  it('loadLines splits, trims, and drops empty lines', async () => {
    const calls: string[] = []
    const fake = async (path: string) => {
      calls.push(path)
      return '  alpha\nbeta  \n\n gamma \n'
    }
    await expect(loadLines('notes.txt', fake)).resolves.toEqual(['alpha', 'beta', 'gamma'])
    expect(calls).toEqual(['notes.txt'])
    await expect(loadLines('empty.txt', async () => '')).resolves.toEqual([])
    await expect(loadLines('blank.txt', async () => '\n  \n\n')).resolves.toEqual([])
    expectTypeOf(loadLines).toEqualTypeOf<
      (path: string, readTextFile: ReadTextFile) => Promise<string[]>
    >()
  })
})
