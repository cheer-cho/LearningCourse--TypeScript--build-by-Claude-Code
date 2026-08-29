import { describe, expect, expectTypeOf, it } from 'vitest'
import { greet, quiz, robot, robotGreeting } from './ex07'

describe('ex03/ex07 — structural typing', () => {
  it('greet works on anything with a name', () => {
    expect(greet({ name: 'Ada' })).toBe('Hello, Ada!')
    expect(greet({ name: '' })).toBe('Hello, !')
    expect(greet(robot)).toBe('Hello, R2-D2!')  // extra props fine via a variable
  })

  it('robot fits structurally despite extra properties', () => {
    expect(robotGreeting).toBe('Hello, R2-D2!')
    expectTypeOf(robot).toMatchObjectType<{ name: string }>()
  })

  it('quiz: excess property checks only hit inline literals', () => {
    expect(quiz.q1).toBe('no')
    expect(quiz.q2).toBe('yes')
  })
})
