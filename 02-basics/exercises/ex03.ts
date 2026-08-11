/**
 * ex03 — Tuples: fixed length, fixed order
 *
 * Arrays say "many of one thing"; tuples say "exactly these things, in
 * this order". Replace the `any` types with tuple types and implement
 * `distance`.
 *
 * Check: npm test -- 02 -t ex03
 */

// TODO: a [name, score] pair — string then number.
export const entry: [string, number] = ['ada', 42]

// TODO: red, green, blue are required; alpha is OPTIONAL.
//       Hint: [number, number, number, number?]
export const rgba: [number, number, number, number?] = [255, 128, 0]

// TODO: a label followed by ANY number of readings.
//       Hint: rest elements — [string, ...number[]]
export const logLine: [string, ...number[]] = ['temps', 21.5, 22.1, 19.8]

type Point = [x: number, y: number]
// Euclidean distance between two 2D points.
// TODO: type both parameters as [x: number, y: number] tuples, then implement.
export function distance(a: Point, b: Point): number {
  const [x1, y1] = a;
  const [x2, y2] = b;
  // return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2))
  return Math.hypot((x2 - x1), (y2 - y1));
  return Math.sqrt((Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2)));
  throw new Error('TODO: implement distance')
}
