// Reference solution — ex06

export type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rect'; width: number; height: number }
  | { kind: 'triangle'; base: number; height: number }
  | { kind: 'ellipse'; rx: number; ry: number }

export function assertNever(value: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(value)}`)
}

export function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2
    case 'rect':
      return shape.width * shape.height
    case 'triangle':
      return (shape.base * shape.height) / 2
    case 'ellipse':
      return Math.PI * shape.rx * shape.ry
    default:
      return assertNever(shape)
  }
}
