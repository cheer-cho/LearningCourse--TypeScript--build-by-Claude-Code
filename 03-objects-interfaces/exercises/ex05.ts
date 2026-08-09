/**
 * ex05 — interface vs type alias
 *
 * For plain object shapes they're interchangeable. Type aliases can also
 * name unions, tuples, and primitives — interfaces cannot.
 *
 * 1. Write Point twice: once as an interface, once as a type alias.
 *    They must be structurally IDENTICAL: x and y, both numbers.
 * 2. Shape can only be a type alias — it's a union:
 *      { kind: 'circle'; radius: number } | { kind: 'square'; size: number }
 * 3. Implement area (circle: πr², square: size²).
 *
 * Check: npm test -- 03 -t ex05
 */

// TODO: as an interface.
export interface PointI {
  // TODO
}

// TODO: the same shape, as a type alias.
export type PointT = unknown

// TODO: the union (try writing it as an interface — it's impossible).
export type Shape = unknown

// TODO: type the parameter as Shape, then implement.
export function area(shape: any): number {
  throw new Error('TODO: implement area')
}
