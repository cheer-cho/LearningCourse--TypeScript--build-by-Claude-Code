// Reference solution — ex07

export type Named = { name: string }

export function greet(entity: Named): string {
  return `Hello, ${entity.name}!`
}

export const robot = { name: 'R2-D2', wheels: 3 }

// Passing via a variable: extra `wheels` is fine (structural typing).
export const robotGreeting: string = greet(robot)

export const quiz: { q1: 'yes' | 'no'; q2: 'yes' | 'no' } = {
  q1: 'no', // inline literal: excess property check rejects `age`
  q2: 'yes', // via variable: normal structural typing allows it
}
