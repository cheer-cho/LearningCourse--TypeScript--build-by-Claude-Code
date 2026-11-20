/**
 * ex07 — Exhaustive-by-construction handler maps
 *
 * A switch + assertNever catches a missing case at the `default` branch,
 * INSIDE the function. A Record<State, handler> map catches it right where
 * the handlers live: the object literal itself won't compile until every
 * state has an entry. Adding a state to the union is a compile error at
 * the map, not a runtime surprise.
 *
 * 1. OrderState: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'.
 * 2. OrderEvent: 'pay' | 'ship' | 'deliver' | 'cancel'.
 * 3. TRANSITIONS: Record<OrderState, (event: OrderEvent) => OrderState> —
 *    one handler per state, exhaustive by construction.
 *      pending:   pay -> paid, cancel -> cancelled, else stays pending
 *      paid:      ship -> shipped, cancel -> cancelled, else stays paid
 *      shipped:   deliver -> delivered, else stays shipped (no cancelling)
 *      delivered: terminal — always stays delivered
 *      cancelled: terminal — always stays cancelled
 * 4. reduceOrder(state, event): looks the handler up in TRANSITIONS and
 *    calls it — no switch, no assertNever.
 *
 *    reduceOrder('pending', 'pay') -> 'paid'
 *    reduceOrder('paid', 'ship')   -> 'shipped'
 *    reduceOrder('delivered', 'cancel') -> 'delivered'  (terminal, no-op)
 *
 * Check: npm test -- 11 -t ex07
 */

// TODO: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
export type OrderState = unknown

// TODO: 'pay' | 'ship' | 'deliver' | 'cancel'
export type OrderEvent = unknown

// TODO: Record<OrderState, (event: OrderEvent) => OrderState>, exhaustive.
export const TRANSITIONS: Record<string, (event: any) => any> = {}

// TODO: dispatch via TRANSITIONS[state](event).
export function reduceOrder(state: any, event: any): any {
  throw new Error('TODO: implement reduceOrder')
}
