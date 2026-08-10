// Helper module for ex02 — complete, DO NOT EDIT.

export interface Circle {
  kind: 'circle'
  radius: number
}

export function area(shape: Circle): number {
  return Math.PI * shape.radius ** 2
}
