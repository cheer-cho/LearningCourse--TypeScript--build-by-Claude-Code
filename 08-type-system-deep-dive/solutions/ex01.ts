// Reference solution — ex01

export const point = { x: 0, y: 0, label: 'origin' }

export type PointKey = keyof typeof point

export type PointType = typeof point

export type LabelType = PointType['label']

export const COLORS = ['red', 'green', 'blue'] as const

export type Color = (typeof COLORS)[number]

export function keysOf<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[]
}
