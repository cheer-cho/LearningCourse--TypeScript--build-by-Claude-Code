// Reference solution — ex12

export type Status = 'active' | 'inactive'
export type Tagged = { id: number } & { tag: string }

export function describeTag(t: Tagged): string {
  return `${t.id}:${t.tag}`
}

export const quiz: {
  q1: 'yes' | 'no'
  q2: 'yes' | 'no'
  q3: 'yes' | 'no'
  q4: 'yes' | 'no'
  q5: 'yes' | 'no'
  q6: 'yes' | 'no'
  q7: 'yes' | 'no'
  q8: 'yes' | 'no'
  q9: 'yes' | 'no'
} = {
  q1: 'yes', // any is assignable to anything
  q2: 'no', // unknown must be narrowed before use
  q3: 'yes', // never is assignable to everything
  q4: 'yes', // unknown -> any is always allowed
  q5: 'yes', // never satisfies any parameter type
  q6: 'no', // excess property check rejects `extra` on a fresh literal
  q7: 'yes', // exact shape satisfies every constituent of the intersection
  q8: 'yes', // a matching literal is assignable to the union it belongs to
  q9: 'no', // a widened string is not assignable to a narrower literal union
}
