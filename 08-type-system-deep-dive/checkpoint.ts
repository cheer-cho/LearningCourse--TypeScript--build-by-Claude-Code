/**
 * ✦ CHECKPOINT 8 — Type System Deep Dive
 *
 * A typed event bus. Combines: mapped types, key remapping with
 * template literals, conditional types with infer, and satisfies.
 *
 * 1. ListenerMap<T>: for every event key K in T, the handler signature
 *      (payload: T[K]) => void
 *      ListenerMap<{ login: string }> -> { login: (payload: string) => void }
 * 2. OnEventName<K>: template literal key remap — 'login' -> 'onLogin'.
 * 3. PayloadOf<H>: extract the payload type from a handler function
 *    type via infer.
 *      PayloadOf<(payload: number) => void> -> number
 * 4. class EventBus<T extends EventMap>:
 *    - on(event, handler): registers a handler for that event (many
 *      handlers per event are allowed).
 *    - emit(event, payload): calls every handler registered for that
 *      event, in registration order, with the given payload.
 * 5. EVENT_NAMES: validate the event name list against Events' keys
 *    with `satisfies`, keeping its literal tuple shape (see ex11).
 *
 * Passing `npm test -- 08` completes this module. 🎉
 */

export type EventMap = Record<string, unknown>

// TODO
export type ListenerMap<T extends EventMap> = unknown

// TODO
export type OnEventName<K extends string> = unknown

// TODO
export type PayloadOf<H> = unknown

export type Events = {
  login: { user: string }
  logout: undefined
}

// TODO: add `as const satisfies readonly (keyof Events)[]`.
export const EVENT_NAMES = ['login', 'logout']

// TODO: constrain T, add private storage, implement both methods.
export class EventBus<T> {
  on(event: any, handler: any): void {
    throw new Error('TODO: implement on')
  }

  emit(event: any, payload: any): void {
    throw new Error('TODO: implement emit')
  }
}
