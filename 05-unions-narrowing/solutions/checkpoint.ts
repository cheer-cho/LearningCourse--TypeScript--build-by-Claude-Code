/**
 * ✦ CHECKPOINT 5 — Unions & Narrowing (reference solution)
 */

export type ChatMessage = { type: 'chat'; user: string; text: string }

export type Incoming =
  | { type: 'join'; user: string }
  | ChatMessage
  | { type: 'leave'; user: string }
  | { type: 'ping'; sentAt: number }

function assertNever(value: never): never {
  throw new Error(`Unhandled message: ${JSON.stringify(value)}`)
}

export function isChat(msg: Incoming): msg is ChatMessage {
  return msg.type === 'chat'
}

export function assertIncoming(value: unknown): asserts value is Incoming {
  if (typeof value !== 'object' || value === null || !('type' in value)) {
    throw new Error('not a message')
  }
  const msg = value as Record<string, unknown>
  switch (msg['type']) {
    case 'join':
    case 'leave':
      if (typeof msg['user'] !== 'string') throw new Error('user must be a string')
      return
    case 'chat':
      if (typeof msg['user'] !== 'string') throw new Error('user must be a string')
      if (typeof msg['text'] !== 'string') throw new Error('text must be a string')
      return
    case 'ping':
      if (typeof msg['sentAt'] !== 'number') throw new Error('sentAt must be a number')
      return
    default:
      throw new Error('unknown message type')
  }
}

export function handle(msg: Incoming): string {
  switch (msg.type) {
    case 'join':
      return `${msg.user} joined`
    case 'chat':
      return `${msg.user}: ${msg.text}`
    case 'leave':
      return `${msg.user} left`
    case 'ping':
      return `pong ${msg.sentAt}`
    default:
      return assertNever(msg)
  }
}

export function transcript(msgs: Incoming[]): string[] {
  return msgs.filter(isChat).map((m) => `${m.user}: ${m.text}`)
}
