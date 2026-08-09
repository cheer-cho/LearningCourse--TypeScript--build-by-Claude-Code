import { describe, expect, it } from 'vitest'
import { quiz } from './ex03'

describe('ex03 — strict flag quiz', () => {
  it('q1: untyped parameter', () => {
    expect(quiz.q1).toBe('noImplicitAny')
  })
  it('q2: null assigned to string', () => {
    expect(quiz.q2).toBe('strictNullChecks')
  })
  it('q3: indexing might miss', () => {
    expect(quiz.q3).toBe('noUncheckedIndexedAccess')
  })
  it('q4: caught error is unknown', () => {
    expect(quiz.q4).toBe('useUnknownInCatchVariables')
  })
  it('q5: optional means absent', () => {
    expect(quiz.q5).toBe('exactOptionalPropertyTypes')
  })
})
