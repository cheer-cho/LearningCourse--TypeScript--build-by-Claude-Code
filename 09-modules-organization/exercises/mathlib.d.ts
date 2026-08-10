/**
 * ex04 — Authoring a .d.ts for untyped JavaScript
 *
 * mathlib.js is plain JavaScript — no types of its own. With `allowJs`
 * off (this course), TypeScript can still import it because THIS sibling
 * declaration file describes its shape. A .d.ts holds only types, never
 * implementations: no function bodies, no initializers beyond a type.
 *
 * Replace every `any` below with the precise type:
 *   add(a, b)              -> number
 *   multiply(a, b)         -> number
 *   clamp(value, min, max) -> number
 *   VERSION                -> the LITERAL '2.1.0', not just string
 *
 * Check: npm test -- 09 -t ex04
 */

export declare function add(a: any, b: any): any
export declare function multiply(a: any, b: any): any
export declare function clamp(value: any, min: any, max: any): any
export declare const VERSION: any
