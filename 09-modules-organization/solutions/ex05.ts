// Reference solution — ex05

import { emit } from './ex05-events'

declare module './ex05-events' {
  interface EventMap {
    keypress: { key: string }
  }
}

export function emitKeypress(key: string): { key: string } {
  return emit('keypress', { key })
}
