// Reference solution — ex01

export type Id = string | number

export type Answer = 'yes' | 'no' | 'maybe'

export function len(x: string | unknown[]): number {
  return x.length
}

export const ids: Id[] = [7, 'a42', 9]
