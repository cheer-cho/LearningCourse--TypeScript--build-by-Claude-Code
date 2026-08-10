import { describe, expect, expectTypeOf, it } from 'vitest'
import { describeAll, quiz, type Animal, type Dog } from './ex08'

describe('ex07/ex08 — variance intuition', () => {
  it('describeAll takes readonly Animal[], so Dog[] fits safely', () => {
    const dogs: Dog[] = [
      { name: 'Rex', breed: 'labrador' },
      { name: 'Mia', breed: 'poodle' },
    ]
    expect(describeAll(dogs)).toEqual(['Rex', 'Mia'])
    const animals: Animal[] = [{ name: 'Pip' }]
    expect(describeAll(animals)).toEqual(['Pip'])
    expectTypeOf(describeAll).parameter(0).toEqualTypeOf<readonly Animal[]>()
    expectTypeOf(describeAll).returns.toEqualTypeOf<string[]>()
  })

  it('quiz: arrays are covariant (unsoundly), parameters contravariant', () => {
    expect(quiz.q1).toBe('yes')
    expect(quiz.q2).toBe('yes')
    expect(quiz.q3).toBe('no')
    expect(quiz.q4).toBe('yes')
    expect(quiz.q5).toBe('no')
  })
})
