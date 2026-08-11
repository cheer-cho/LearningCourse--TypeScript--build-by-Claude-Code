/**
 * ✦ CHECKPOINT 5 — Unions & Narrowing
 *
 * A chat-server message pipeline. Combines: discriminated unions,
 * assertion functions over unknown input, type predicates with filter,
 * and an exhaustive handler. Each declaration below explains its own job.
 *
 * Passing `npm test -- 05` completes this module. 🎉
 */

// A chat line from a user.
//   Shape: { type: 'chat'; user: string; text: string }
export type ChatMessage = unknown

// Everything the server can receive: the union of ChatMessage and
//   { type: 'join'; user: string }
//   { type: 'leave'; user: string }
//   { type: 'ping'; sentAt: number }
export type Incoming = unknown

// Is this message a chat line? A TYPE PREDICATE, so it narrows inside
// if-blocks and works with Array.filter.
//   Signature: (msg: Incoming) => msg is ChatMessage
export function isChat(msg: any): any {
  throw new Error('TODO: implement isChat')
}

// Untrusted input enters here. Prove (at runtime!) that `value` is a
// valid Incoming — or throw an Error. An ASSERTION FUNCTION:
//   Signature: (value: unknown) => asserts value is Incoming
// Valid means: an object whose `type` is one of the four tags AND the
// variant's other fields have the right runtime types (user: string,
// text: string, sentAt: number).
// Hint: after the object/tag checks, read fields via
//   const msg = value as Record<string, unknown>
export function assertIncoming(value: any): any {
  throw new Error('TODO: implement assertIncoming')
}

// Format one message for the log, via an EXHAUSTIVE switch ending in
// default: assertNever (define assertNever locally — the ex06 pattern).
//   chat  -> '<user>: <text>'        join -> '<user> joined'
//   leave -> '<user> left'           ping -> 'pong <sentAt>'
//   Signature: (msg: Incoming) => string
export function handle(msg: any): any {
  throw new Error('TODO: implement handle')
}

// Only the chat lines, formatted like handle's chat case. Use
// filter(isChat) — the predicate narrows the array element type.
//   Signature: (msgs: Incoming[]) => string[]
export function transcript(msgs: any): any {
  throw new Error('TODO: implement transcript')
}
