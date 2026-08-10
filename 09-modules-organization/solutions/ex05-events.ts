// Helper module for ex05 — complete, DO NOT EDIT.
// ex05.ts augments EventMap below with a new event via `declare module`.

export interface EventMap {
  click: { x: number; y: number }
}

export function emit<K extends keyof EventMap>(type: K, payload: EventMap[K]): EventMap[K] {
  return payload
}
