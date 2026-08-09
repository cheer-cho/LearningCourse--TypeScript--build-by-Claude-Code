// Reference solution — ex03

type StrictFlag =
  | 'noImplicitAny'
  | 'strictNullChecks'
  | 'noUncheckedIndexedAccess'
  | 'strictPropertyInitialization'
  | 'useUnknownInCatchVariables'
  | 'exactOptionalPropertyTypes'

export const quiz: Record<'q1' | 'q2' | 'q3' | 'q4' | 'q5', StrictFlag> = {
  q1: 'noImplicitAny',
  q2: 'strictNullChecks',
  q3: 'noUncheckedIndexedAccess',
  q4: 'useUnknownInCatchVariables',
  q5: 'exactOptionalPropertyTypes',
}
