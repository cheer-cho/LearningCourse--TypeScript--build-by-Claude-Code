import { describe, expect, it } from 'vitest'
import { describeTag, quiz } from './ex12'

describe('ex08/ex12 — assignability & excess property checks', () => {
  it('describeTag formats an intersection-typed value', () => {
    expect(describeTag({ id: 1, tag: 'x' })).toBe('1:x')
  })

  it('quiz: assignability edge cases', () => {
    expect(quiz.q1).toBe('yes')
    expect(quiz.q2).toBe('no')
    expect(quiz.q3).toBe('yes')
    expect(quiz.q4).toBe('yes')
    expect(quiz.q5).toBe('yes')
    expect(quiz.q6).toBe('no')
    expect(quiz.q7).toBe('yes')
    expect(quiz.q8).toBe('yes')
    expect(quiz.q9).toBe('no')
  })
})
