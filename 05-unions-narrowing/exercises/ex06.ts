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
export type Circle = { kind: 'circle'; radius: number };
export type Rectangle = { kind: 'rect'; width: number; height: number };
export type Triangle = { kind: 'triangle'; base: number; height: number };
export type Ellipse = { kind: 'ellipse'; rx: number; ry: number };
export type Shape = Circle | Rectangle | Triangle | Ellipse;

// TODO: type the parameter and return as never, then implement.
export function assertNever(value: never): never {
  throw new Error(`Unhandled: ${JSON.stringify(value)}`)
}

// TODO: type the parameter (Shape) and return, then implement
// EXHAUSTIVELY (default: assertNever).
export function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'rect':
      return shape.width * shape.height;
    case 'triangle':
      return 0.5 * shape.base * shape.height;
    case 'ellipse':
      return Math.PI * shape.rx * shape.ry;
    default:
      return assertNever(shape);
  }
}

/**
 * A quick question before you move on.
 * Did you try the sanity check from the instructions,
 * commenting out the ellipse case?
 * 
 * If so, what type did TypeScript say shape had in the default branch,
 * and why did that break the call to assertNever?
 * If you can explain that in one sentence, you own this concept.
 * 
 * 
 * Answer: remove the 'ellipse' case the shape in default become 'Ellipse'
 * error TS2345: Argument of type 'Ellipse' is not assignable to parameter of type 'never'.
 * therefore, typescript will throw error type passing into assertNever is mismatched.
 */
