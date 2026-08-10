/**
 * ✦ CHECKPOINT 5 — Unions & Narrowing
 *
 * A chat-server message pipeline. Combines: discriminated unions,
 * assertion functions over unknown input, type predicates with filter,
 * and an exhaustive handler.
 *
 * 1. Define ChatMessage as { type: 'chat'; user: string; text: string }.
 * 2. Define Incoming as the union of ChatMessage and:
 *      { type: 'join'; user: string }
 *      { type: 'leave'; user: string }
 *      { type: 'ping'; sentAt: number }
 * 3. isChat: type predicate (msg: Incoming) => msg is ChatMessage.
 * 4. assertIncoming(value): (value: unknown) => asserts value is
 *    Incoming. Throw an Error unless value is an object whose `type`
 *    is one of the four tags AND the variant's other fields have the
 *    right runtime types (user: string, text: string, sentAt: number).
 *    Hint: after the object/tag checks, read fields via
 *    `const msg = value as Record<string, unknown>`.
 * 5. handle(msg): (msg: Incoming) => string, via an EXHAUSTIVE switch
 *    ending in default: assertNever (define assertNever locally —
 *    reuse the ex06 pattern).
 *      join  -> '<user> joined'        chat -> '<user>: <text>'
 *      leave -> '<user> left'          ping -> 'pong <sentAt>'
 * 6. transcript(msgs): (msgs: Incoming[]) => string[] — only the chat
 *    lines, formatted like handle's chat case. Use filter(isChat).
 *
 * Passing `npm test -- 05` completes this module. 🎉
 */

// TODO
export type ChatMessage = unknown

// TODO
export type Incoming = unknown

// TODO: declare as a type predicate, then implement.
export function isChat(msg: any): any {
  throw new Error('TODO: implement isChat')
}

// TODO: declare as an assertion function, then implement.
export function assertIncoming(value: any): any {
  throw new Error('TODO: implement assertIncoming')
}

// TODO: fix the types, then implement (exhaustively!).
export function handle(msg: any): any {
  throw new Error('TODO: implement handle')
}

// TODO: fix the types, then implement.
export function transcript(msgs: any): any {
  throw new Error('TODO: implement transcript')
}
