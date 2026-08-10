import { describe, expect, expectTypeOf, it } from 'vitest'
import { BankAccount, SavingsAccount } from './ex02'

describe('ex06/ex02 — access modifiers', () => {
  it('deposit and withdraw guard the balance with the pin', () => {
    const a = new BankAccount('acc-1', '1234')
    expect(a.getBalance()).toBe(0)
    a.deposit(100)
    expect(a.getBalance()).toBe(100)
    expect(a.withdraw(30, '1234')).toBe(true)
    expect(a.getBalance()).toBe(70)
    expect(a.withdraw(30, '9999')).toBe(false)
    expect(a.withdraw(1000, '1234')).toBe(false)
    expect(a.getBalance()).toBe(70)
    expectTypeOf(a.deposit).toEqualTypeOf<(amount: number) => void>()
    expectTypeOf(a.withdraw).toEqualTypeOf<(amount: number, pin: string) => boolean>()
    expectTypeOf(a.getBalance).toEqualTypeOf<() => number>()
  })

  it('the public surface hides balance and the pin', () => {
    expectTypeOf<keyof BankAccount>().toEqualTypeOf<'id' | 'deposit' | 'withdraw' | 'getBalance'>()
    expectTypeOf<Pick<BankAccount, 'id'>>().toEqualTypeOf<{ readonly id: string }>()
  })

  it('TS protected is still a runtime property, #pin truly is not', () => {
    const a = new BankAccount('acc-2', '4321')
    expect(Object.keys(a)).toContain('balance') // TS privacy is compile-time only!
    expect(JSON.stringify(a)).not.toContain('4321') // ...but #fields never leak
  })

  it('SavingsAccount reaches the protected balance', () => {
    const s = new SavingsAccount('sav-1', '0000')
    s.deposit(200)
    s.addInterest(0.1)
    expect(s.getBalance()).toBeCloseTo(220)
    expectTypeOf(s.addInterest).toEqualTypeOf<(rate: number) => void>()
    expectTypeOf<keyof SavingsAccount>().toEqualTypeOf<
      'id' | 'deposit' | 'withdraw' | 'getBalance' | 'addInterest'
    >()
  })
})
