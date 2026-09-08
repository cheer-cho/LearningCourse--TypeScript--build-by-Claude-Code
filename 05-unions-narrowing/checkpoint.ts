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
export type ChatMessage = {
  type: 'chat';
  user: string;
  text: string;
};

// Everything the server can receive: the union of ChatMessage and
//   { type: 'join'; user: string }
//   { type: 'leave'; user: string }
//   { type: 'ping'; sentAt: number }
export type Join = { type: 'join'; user: string };
export type Leave = { type: 'leave'; user: string };
export type Ping = { type: 'ping'; sentAt: number };
export type Incoming = ChatMessage | Join | Leave | Ping;

// Is this message a chat line? A TYPE PREDICATE, so it narrows inside
// if-blocks and works with Array.filter.
//   Signature: (msg: Incoming) => msg is ChatMessage
export function isChat(msg: Incoming): msg is ChatMessage {
  return msg.type === 'chat';
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

type Field = 'user' | 'text' | 'sentAt';

// Untrusted input enters here. Prove (at runtime!) that `value` is a
// valid Incoming — or throw an Error. An ASSERTION FUNCTION:
//   Signature: (value: unknown) => asserts value is Incoming
// Valid means: an object whose `type` is one of the four tags AND the
// variant's other fields have the right runtime types (user: string,
// text: string, sentAt: number).
// Hint: after the object/tag checks, read fields via
//   const msg = value as Record<string, unknown>
export function assertIncoming(value: unknown): asserts value is Incoming {
  if (typeof value !== 'object' || value === null) {
    throw new Error('Incoming message shape is not supported');
  }

  const { type, user, text, sentAt } = value as Record<string, unknown>;

  const throwPropertyError: (property: Field) => never = (property) => {
    const types = {
      user: 'string',
      text: 'string',
      sentAt: 'number',
    };
    throw new Error(`${property} must be ${types[property]}`);
  };

  if (type === 'chat') {
    if (!isString(user)) throwPropertyError('user');
    if (!isString(text)) throwPropertyError('text');
  } else if (type === 'join' || type === 'leave') {
    if (!isString(user)) throwPropertyError('user');
  } else if (type === 'ping') {
    if (typeof sentAt !== 'number') throwPropertyError('sentAt');
  } else {
    throw new Error('type is not valid');
  }
}

export function assertNever(value: never): never {
  throw new Error(`Unhandled: ${JSON.stringify(value)}`);
}

// Format one message for the log, via an EXHAUSTIVE switch ending in
// default: assertNever (define assertNever locally — the ex06 pattern).
//   chat  -> '<user>: <text>'        join -> '<user> joined'
//   leave -> '<user> left'           ping -> 'pong <sentAt>'
//   Signature: (msg: Incoming) => string
export function handle(msg: Incoming): string {
  switch (msg.type) {
    case 'chat':
      return `${msg.user}: ${msg.text}`;
    case 'join':
      return `${msg.user} joined`;
    case 'leave':
      return `${msg.user} left`;
    case 'ping':
      return `pong ${msg.sentAt}`;
    default:
      return assertNever(msg);
  }
}

// Only the chat lines, formatted like handle's chat case. Use
// filter(isChat) — the predicate narrows the array element type.
//   Signature: (msgs: Incoming[]) => string[]
export function transcript(msgs: Incoming[]): string[] {
  return msgs.filter(isChat).map(handle);
}

/**
 * ─── Review quiz after module 05 (earlier modules) ────────────────────
 * Answer in your head or in a playground file, then ask to check.
 *
 * 1. `text?.length || 0` vs `text?.length ?? 0`: when `text` is `''`,
 *    what does each return, and which one is the bug?
 *
 * 2. A function has an optional parameter `end?: number`. Write the
 *    condition that asks "was it passed?" rather than "is it truthy?".
 *
 * 3. `north: 'north' as Direction` compiles even if the mapping is wrong.
 *    What should replace `as Direction` so the compiler checks the value
 *    instead of trusting you?
 *
 * 4. Inside a guard like `assertIsUser(value: unknown)`, why is
 *    `value as User` at the top a trap, and what honest cast do you use
 *    instead?
 *
 * 5. What is the difference between `function f<ApplyOp>(...)` and
 *    `const f: ApplyOp = ...`?
 */
