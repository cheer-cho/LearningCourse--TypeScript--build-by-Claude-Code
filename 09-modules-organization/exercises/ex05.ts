/**
 * ex05 — Augmenting a module you own (`declare module`)
 *
 * `declare module '<specifier>'` reopens an existing module and MERGES
 * new declarations into it — how plugins add fields to a library's
 * interfaces. Here you augment the sibling ex05-events module to teach
 * it about an event it doesn't know about.
 *
 * 1. Augment EventMap (declared in ./ex05-events) by adding:
 *      keypress: { key: string }
 *    (a `declare module` block must live in a file that is itself a
 *    module — this file already imports from ex05-events, so it is one.)
 * 2. emitKeypress(key): calls emit('keypress', { key }) and returns it.
 *      emitKeypress('Enter') -> { key: 'Enter' }
 *
 * Check: npm test -- 09 -t ex05
 */

import { emit } from './ex05-events'

// TODO 1: declare module './ex05-events' { interface EventMap { ... } }

// TODO 2: precise param/return types, then implement via emit().
export function emitKeypress(key: any): any {
  throw new Error('TODO: implement emitKeypress')
}
