/**
 * ex01 — keyof, typeof, and indexed access
 *
 * Type queries let you DERIVE a type from something that already
 * exists, instead of writing it out by hand.
 *
 * 1. PointKey: the union of point's property names (keyof + typeof).
 * 2. PointType: the shape of point, as a type (typeof).
 * 3. LabelType: the type of point's `label` property (indexed access).
 * 4. Color: the union of COLORS' elements (T[number]).
 * 5. keysOf(obj): the keys of any object, precisely typed as (keyof T)[].
 *
 * Check: npm test -- 08 -t ex01
 */

export const point = { x: 0, y: 0, label: 'origin' }

// TODO: keyof typeof point
export type PointKey = unknown

// TODO: typeof point
export type PointType = unknown

// TODO: indexed access — the type of point.label
export type LabelType = unknown

export const COLORS = ['red', 'green', 'blue'] as const

// TODO: the union of COLORS' element types
export type Color = unknown

// TODO: type the parameter and return type, then implement.
export function keysOf(obj: any): any {
  throw new Error('TODO: implement keysOf')
}
