// Reference solution — checkpoint 2

export type Light = 'red' | 'green' | 'yellow'

export const LIGHTS = ['red', 'green', 'yellow'] as const

export const DURATIONS: [number, number, number] = [30, 25, 5]

function assertNever(value: never): never {
  throw new Error(`Unhandled light: ${JSON.stringify(value)}`)
}

export function next(light: Light): Light {
  switch (light) {
    case 'red':
      return 'green'
    case 'green':
      return 'yellow'
    case 'yellow':
      return 'red'
    default:
      return assertNever(light)
  }
}

export function simulate(start: Light, steps: number): Light[] {
  const sequence: Light[] = []
  let current = start
  for (let i = 0; i < steps; i++) {
    current = next(current)
    sequence.push(current)
  }
  return sequence
}
