// Reference solution — ex05

export type Direction = 'north' | 'south' | 'east' | 'west'

export function opposite(dir: Direction): Direction {
  switch (dir) {
    case 'north':
      return 'south'
    case 'south':
      return 'north'
    case 'east':
      return 'west'
    case 'west':
      return 'east'
  }
}

export const ORIGIN = { x: 0, y: 0 } as const

export let mode: 'dark' = 'dark'
