/**
 * ex03 — Namespaces (legacy) & function merging
 *
 * The classic pre-ESM pattern: a namespace MERGED onto a function makes
 * it callable AND gives it properties (think jQuery's `$()` + `$.ajax`).
 * Namespaces can hold types as well as values.
 *
 * 1. greet(name, options?):
 *      greet('Ada')                          -> 'Hello, Ada!'
 *      greet('Ada', { punctuation: '?!' })   -> 'Hello, Ada?!'
 * 2. In the merged namespace:
 *      - Options: { punctuation?: string }
 *      - defaultName: 'world' — KEEP the literal type (no annotation!)
 *      - shout(name): greet(name) uppercased -> 'HELLO, WORLD!'
 *
 * Note: the namespace must come AFTER the function it merges with.
 *
 * Check: npm test -- 09 -t ex03
 */

// TODO: type the parameters (options is an optional greet.Options).
export function greet(name: any, options?: any): any {
  throw new Error('TODO: implement greet')
}

export namespace greet {
  export interface Options {
    // TODO: optional string
    punctuation?: any
  }

  // TODO: remove the annotation so the literal type is kept.
  export const defaultName: any = 'world'

  // TODO: precise types, then implement via greet().
  export function shout(name: any): any {
    throw new Error('TODO: implement greet.shout')
  }
}
