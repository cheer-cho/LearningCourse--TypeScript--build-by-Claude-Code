import { describe, expect, it } from 'vitest'
import { LogLevel, Status, statusLabel } from './ex04'

describe('ex02/ex04 — enums', () => {
  it('Status is a numeric enum with auto-incremented members', () => {
    expect(Status.Draft).toBe(0)
    expect(Status.Published).toBe(1)
    expect(Status.Archived).toBe(2)
  })

  it('numeric enums have reverse mappings at runtime', () => {
    expect(Status[2]).toBe('Archived')
  })

  it('LogLevel is a string enum (no reverse mapping)', () => {
    expect(LogLevel.Debug).toBe('DEBUG')
    expect(LogLevel.Info).toBe('INFO')
    expect(LogLevel.Error).toBe('ERROR')
  })

  it('statusLabel covers every member', () => {
    expect(statusLabel(Status.Draft)).toBe('draft')
    expect(statusLabel(Status.Published)).toBe('published')
    expect(statusLabel(Status.Archived)).toBe('archived')
  })
})
