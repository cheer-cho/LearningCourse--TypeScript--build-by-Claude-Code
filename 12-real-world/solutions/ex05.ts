// Reference solution — ex05

function generateTrackingCode(id: string): string {
  return `TRK-${id.toUpperCase()}`
}

export type OrderStatus = 'pending' | 'shipped' | 'delivered' | 'cancelled'

export type Order = {
  id: string
  status: OrderStatus
  trackingCode: string | null
}

export function advanceStatus(order: Order): Order {
  if (order.status === 'pending') {
    return { ...order, status: 'shipped', trackingCode: generateTrackingCode(order.id) }
  }
  if (order.status === 'shipped') {
    return { ...order, status: 'delivered' }
  }
  return order
}

export function describeOrder(order: Order): string {
  const code = order.trackingCode === null ? 'not yet shipped' : order.trackingCode
  return `Order ${order.id}: ${order.status} (${code})`
}
