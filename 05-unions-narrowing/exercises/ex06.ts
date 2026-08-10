/**
 * ex06 — Exhaustiveness checking with never
 *
 * You met assertNever in module 02. Here's why it matters at scale:
 * when a switch handles EVERY variant, the value in `default` has type
 * `never`. Add a fifth variant to the union and it no longer narrows
 * to never — every forgetful switch becomes a COMPILE error, pointing
 * you at each spot that needs updating. That is exhaustiveness as a
 * feature, not a convention.
 *
 * 1. Define Shape as the union of exactly these four variants:
 *      { kind: 'circle'; radius: number }
 *      { kind: 'rect'; width: number; height: number }
 *      { kind: 'triangle'; base: number; height: number }
 *      { kind: 'ellipse'; rx: number; ry: number }
 * 2. Implement assertNever(value): takes never, returns never, throws
 *    an Error mentioning the impossible value.
 * 3. area(shape): exhaustive switch on shape.kind ending in
 *    `default: return assertNever(shape)`.
 *      circle   -> PI * radius^2
 *      rect     -> width * height
 *      triangle -> base * height / 2
 *      ellipse  -> PI * rx * ry
 *    Sanity check: comment out the 'ellipse' case — the file should
 *    stop compiling. Put it back.
 *
 * Check: npm test -- 05 -t ex06
 */

// TODO: the four-variant discriminated union described above.
export type Shape = unknown

// TODO: type the parameter and return as never, then implement.
export function assertNever(value: any): any {
  throw new Error('TODO: implement assertNever')
}

// TODO: type the parameter (Shape) and return, then implement
// EXHAUSTIVELY (default: assertNever).
export function area(shape: any): any {
  throw new Error('TODO: implement area')
}
