// Reference solution — ex08

export const answer = 42

// let widens 'hello' to string.
export let greeting = 'hello'

export const steps = [1, 2, 3] as const

export const describeNum = (n: number) => `number: ${n}`

// `as const` on just the property keeps only `kind` literal.
export const results = [
  { kind: 'ok' as const, value: 1 },
  { kind: 'ok' as const, value: 2 },
]
