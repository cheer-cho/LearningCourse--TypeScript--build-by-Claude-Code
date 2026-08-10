// Helper module for ex02 — complete, DO NOT EDIT.

export interface Square {
  kind: 'square'
  side: number
}

export function area(shape: Square): number {
  return shape.side ** 2
}
