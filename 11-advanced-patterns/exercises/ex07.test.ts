import { describe, expect, expectTypeOf, it } from 'vitest'
import { reduceOrder, TRANSITIONS, type OrderEvent, type OrderState } from './ex07'

describe('ex11/ex07 — exhaustive handler maps', () => {
  it('OrderState and OrderEvent are the expected unions', () => {
    expectTypeOf<OrderState>().toEqualTypeOf<'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'>()
    expectTypeOf<OrderEvent>().toEqualTypeOf<'pay' | 'ship' | 'deliver' | 'cancel'>()
  })

  it('TRANSITIONS has exactly one handler per state', () => {
    expectTypeOf(TRANSITIONS).toEqualTypeOf<Record<OrderState, (event: OrderEvent) => OrderState>>()
    expect(Object.keys(TRANSITIONS).sort()).toEqual(['cancelled', 'delivered', 'paid', 'pending', 'shipped'])
  })

  it('reduceOrder follows the order lifecycle forward', () => {
    expect(reduceOrder('pending', 'pay')).toBe('paid')
    expect(reduceOrder('paid', 'ship')).toBe('shipped')
    expect(reduceOrder('shipped', 'deliver')).toBe('delivered')
  })

  it('cancel only works before shipping', () => {
    expect(reduceOrder('pending', 'cancel')).toBe('cancelled')
    expect(reduceOrder('paid', 'cancel')).toBe('cancelled')
    expect(reduceOrder('shipped', 'cancel')).toBe('shipped') // no-op, shipped can't cancel
  })

  it('terminal states ignore every event', () => {
    expect(reduceOrder('delivered', 'pay')).toBe('delivered')
    expect(reduceOrder('cancelled', 'ship')).toBe('cancelled')
    expect(reduceOrder('delivered', 'cancel')).toBe('delivered')
    expect(reduceOrder('cancelled', 'cancel')).toBe('cancelled')
  })

  it('an event that does not apply leaves the state unchanged', () => {
    expect(reduceOrder('pending', 'ship')).toBe('pending')
    expect(reduceOrder('paid', 'pay')).toBe('paid')
  })

  it('reduceOrder is fully typed and rejects unknown states/events', () => {
    expectTypeOf(reduceOrder).toEqualTypeOf<(state: OrderState, event: OrderEvent) => OrderState>()
    const attempt = () => {
      // @ts-expect-error — 'refund' is not an OrderEvent
      reduceOrder('pending', 'refund')
      // @ts-expect-error — 'archived' is not an OrderState
      reduceOrder('archived', 'pay')
    }
    expect(typeof attempt).toBe('function')
  })

  it('a handler map missing a state does not compile', () => {
    const attempt = () => {
      // @ts-expect-error — missing the 'cancelled' handler
      const incomplete: Record<OrderState, (event: OrderEvent) => OrderState> = {
        pending: (event) => (event === 'pay' ? 'paid' : 'pending'),
        paid: (event) => (event === 'ship' ? 'shipped' : 'paid'),
        shipped: (event) => (event === 'deliver' ? 'delivered' : 'shipped'),
        delivered: () => 'delivered',
      }
      return incomplete
    }
    expect(typeof attempt).toBe('function')
  })
})
