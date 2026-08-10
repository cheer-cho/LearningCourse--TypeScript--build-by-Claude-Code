/**
 * ex05 — Migrating JS to TS: tightening loose types
 *
 * This file is a straight rename of legacy `.js` -> `.ts` — step 1 of the
 * migration described in the lesson. Behavior is already correct; every
 * type is loose (`any` params, a stringly-typed status, an implicit
 * null). Your job is step 3: TIGHTEN the types WITHOUT changing behavior.
 * Every runtime example below must keep working exactly as it does now —
 * only the compiler should get smarter.
 *
 * 1. OrderStatus: replace the loose `string` with the literal union
 *    'pending' | 'shipped' | 'delivered' | 'cancelled'.
 * 2. Order: type the shape precisely — id (string), status (OrderStatus),
 *    trackingCode (string, but null before shipping — always present as
 *    a key, never optional).
 * 3. advanceStatus: retype `order: any` to `order: Order`, return `Order`.
 *    Behavior: pending -> shipped (fills trackingCode via
 *    generateTrackingCode), shipped -> delivered, delivered/cancelled are
 *    terminal (return the same order unchanged).
 * 4. describeOrder: retype `order: any` to `order: Order`, return
 *    `string`. Behavior unchanged — reads trackingCode, which may be
 *    null.
 *
 * Check: npm test -- 12 -t ex05
 */

// Given — do not change.
function generateTrackingCode(id: string): string {
  return `TRK-${id.toUpperCase()}`
}

// TODO: 'pending' | 'shipped' | 'delivered' | 'cancelled'
export type OrderStatus = string

// TODO: { id: string; status: OrderStatus; trackingCode: string | null }
export type Order = any

// TODO: retype order: any -> Order, return Order. Do not change behavior.
export function advanceStatus(order: any): any {
  if (order.status === 'pending') {
    return { ...order, status: 'shipped', trackingCode: generateTrackingCode(order.id) }
  }
  if (order.status === 'shipped') {
    return { ...order, status: 'delivered' }
  }
  return order
}

// TODO: retype order: any -> Order, return string. Do not change behavior.
export function describeOrder(order: any): any {
  const code = order.trackingCode === null ? 'not yet shipped' : order.trackingCode
  return `Order ${order.id}: ${order.status} (${code})`
}
