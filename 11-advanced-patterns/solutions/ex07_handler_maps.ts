// Reference solution — ex07

export type OrderState = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'

export type OrderEvent = 'pay' | 'ship' | 'deliver' | 'cancel'

export const TRANSITIONS: Record<OrderState, (event: OrderEvent) => OrderState> = {
  pending: (event) => (event === 'pay' ? 'paid' : event === 'cancel' ? 'cancelled' : 'pending'),
  paid: (event) => (event === 'ship' ? 'shipped' : event === 'cancel' ? 'cancelled' : 'paid'),
  shipped: (event) => (event === 'deliver' ? 'delivered' : 'shipped'),
  delivered: () => 'delivered',
  cancelled: () => 'cancelled',
}

export function reduceOrder(state: OrderState, event: OrderEvent): OrderState {
  return TRANSITIONS[state](event)
}
