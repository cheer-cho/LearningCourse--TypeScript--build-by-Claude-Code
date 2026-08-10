import { describe, expect, expectTypeOf, it } from 'vitest'
import { advanceStatus, describeOrder, type Order, type OrderStatus } from './ex05'

type ExpectedOrder = {
  id: string
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled'
  trackingCode: string | null
}

describe('ex12/ex05 — migrating JS to TS', () => {
  it('OrderStatus is the four-state literal union, not a bare string', () => {
    expectTypeOf<OrderStatus>().toEqualTypeOf<'pending' | 'shipped' | 'delivered' | 'cancelled'>()
  })

  it('Order has a precise shape; trackingCode is string | null (not optional)', () => {
    expectTypeOf<Order>().toEqualTypeOf<ExpectedOrder>()
  })

  it('advanceStatus and describeOrder are typed with Order, not any', () => {
    expectTypeOf(advanceStatus).toEqualTypeOf<(order: ExpectedOrder) => ExpectedOrder>()
    expectTypeOf(describeOrder).toEqualTypeOf<(order: ExpectedOrder) => string>()
  })

  it('advanceStatus: pending -> shipped generates a tracking code', () => {
    const order: Order = { id: 'a1', status: 'pending', trackingCode: null }
    expect(advanceStatus(order)).toEqual({ id: 'a1', status: 'shipped', trackingCode: 'TRK-A1' })
  })

  it('advanceStatus: shipped -> delivered keeps the tracking code', () => {
    const order: Order = { id: 'a1', status: 'shipped', trackingCode: 'TRK-A1' }
    expect(advanceStatus(order)).toEqual({ id: 'a1', status: 'delivered', trackingCode: 'TRK-A1' })
  })

  it('advanceStatus: delivered and cancelled are terminal', () => {
    const delivered: Order = { id: 'a1', status: 'delivered', trackingCode: 'TRK-A1' }
    const cancelled: Order = { id: 'b2', status: 'cancelled', trackingCode: null }
    expect(advanceStatus(delivered)).toEqual(delivered)
    expect(advanceStatus(cancelled)).toEqual(cancelled)
  })

  it('describeOrder reports "not yet shipped" for a null tracking code', () => {
    const order: Order = { id: 'a1', status: 'pending', trackingCode: null }
    expect(describeOrder(order)).toBe('Order a1: pending (not yet shipped)')
  })

  it('describeOrder reports the tracking code once shipped', () => {
    const order: Order = { id: 'a1', status: 'shipped', trackingCode: 'TRK-A1' }
    expect(describeOrder(order)).toBe('Order a1: shipped (TRK-A1)')
  })

  it('an invalid status does not compile against the tightened Order type', () => {
    const attempt = () => {
      // @ts-expect-error — 'unknown' is not a valid OrderStatus
      const bad: Order = { id: 'x', status: 'unknown', trackingCode: null }
      return bad
    }
    expect(typeof attempt).toBe('function')
  })
})
