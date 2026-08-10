import { describe, expect, expectTypeOf, it } from 'vitest'
import { TicketMachine } from './ex04'

describe('ex06/ex04 — statics & static blocks', () => {
  it('issues sequential numbers starting at START', () => {
    TicketMachine.reset()
    expect(TicketMachine.issue()).toBe(100)
    expect(TicketMachine.issue()).toBe(101)
    expect(TicketMachine.issue()).toBe(102)
    expectTypeOf(TicketMachine.issue).toEqualTypeOf<() => number>()
  })

  it('reset winds back to START', () => {
    TicketMachine.reset()
    TicketMachine.issue()
    TicketMachine.reset()
    expect(TicketMachine.issue()).toBe(100)
    expectTypeOf(TicketMachine.reset).toEqualTypeOf<() => void>()
  })

  it('START is a readonly static number; next is private', () => {
    expect(TicketMachine.START).toBe(100)
    expectTypeOf<Pick<typeof TicketMachine, 'START'>>().toEqualTypeOf<{ readonly START: number }>()
    expectTypeOf<keyof typeof TicketMachine>().toEqualTypeOf<'prototype' | 'START' | 'issue' | 'reset'>()
  })
})
