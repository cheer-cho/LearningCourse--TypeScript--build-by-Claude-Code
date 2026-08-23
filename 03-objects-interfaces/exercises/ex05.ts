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
  x: number;
  y: number;
}

// TODO: the same shape, as a type alias.
export type PointT = {
  x: number;
  y: number;
};

// TODO: the union (try writing it as an interface — it's impossible).
type Circle = { kind: 'circle'; radius: number; };
type Square = { kind: 'square'; size: number; };
export type Shape = Circle | Square;


// TODO: type the parameter as Shape, then implement.
export function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * (shape.radius ** 2);
    case 'square':
      return shape.size ** 2;
  }
}
