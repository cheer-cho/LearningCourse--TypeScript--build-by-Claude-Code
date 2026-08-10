import { describe, expect, it } from 'vitest'
import { legacyGreeting, legacyVersion, quiz, viaNamespace } from './ex06'

describe('ex09/ex06 — ESM/CJS interop', () => {
  it('the default import is callable and carries its property', () => {
    expect(legacyGreeting).toBe('hi, Ada')
    expect(legacyVersion).toBe('1.0.0')
  })

  it('the namespace import exposes the same function via .default', () => {
    expect(viaNamespace).toBe('hi, Ada')
  })

  it('quiz: esModuleInterop and namespace imports', () => {
    expect(quiz.q1).toBe('yes')
    expect(quiz.q2).toBe('no')
    expect(quiz.q3).toBe('no')
  })
})
