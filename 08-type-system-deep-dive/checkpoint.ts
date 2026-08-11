/**
 * ✦ CHECKPOINT 8 — Type System Deep Dive
 *
 * A typed event bus. Combines: mapped types, key remapping with
 * template literals, conditional types with infer, and satisfies.
 * Each declaration below explains its own job.
 *
 * Passing `npm test -- 08` completes this module. 🎉
 */

export type EventMap = Record<string, unknown>

// A MAPPED TYPE: for every event key K in T, the handler signature
// (payload: T[K]) => void.
//   ListenerMap<{ login: string }> -> { login: (payload: string) => void }
export type ListenerMap<T extends EventMap> = unknown

// Remap an event name to its handler-prop name with a TEMPLATE LITERAL
// type: 'login' -> 'onLogin'.
//   Hint: Capitalize<K>.
export type OnEventName<K extends string> = unknown

// Extract the payload type out of a handler function type — a
// CONDITIONAL TYPE with infer.
//   PayloadOf<(payload: number) => void> -> number
export type PayloadOf<H> = unknown

export type Events = {
  login: { user: string }
  logout: undefined
}

// The list of event names, validated against Events' keys WITHOUT
// losing its literal tuple shape (see ex11).
//   Add: as const satisfies readonly (keyof Events)[]
export const EVENT_NAMES = ['login', 'logout']

// The bus itself. Constrain T (extends EventMap), add private storage.
//   - on(event, handler): registers a handler for that event — many
//     handlers per event are allowed.
//   - emit(event, payload): calls every handler registered for that
//     event, in registration order, with the given payload.
export class EventBus<T> {
  on(event: any, handler: any): void {
    throw new Error('TODO: implement on')
  }

  emit(event: any, payload: any): void {
    throw new Error('TODO: implement emit')
  }
}
