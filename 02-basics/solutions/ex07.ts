// Reference solution — ex07

export type Shape = 'circle' | 'square' | 'triangle'

export function assertNever(value: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(value)}`)
}

export function sides(shape: Shape): number {
  switch (shape) {
    case 'circle':
      return 0
    case 'square':
      return 4
    case 'triangle':
      return 3
    default:
      return assertNever(shape)
  }
}

export function runAll(fns: Array<() => void>): void {
  for (const fn of fns) fn()
}
