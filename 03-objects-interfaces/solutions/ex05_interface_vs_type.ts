// Reference solution — ex05

export interface PointI {
  x: number
  y: number
}

export type PointT = {
  x: number
  y: number
}

export type Shape = { kind: 'circle'; radius: number } | { kind: 'square'; size: number }

export function area(shape: Shape): number {
  if (shape.kind === 'circle') return Math.PI * shape.radius ** 2
  return shape.size ** 2
}
