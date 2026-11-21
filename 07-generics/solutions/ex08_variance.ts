// Reference solution — ex08

export type Animal = { name: string }
export type Dog = { name: string; breed: string }

export function describeAll(animals: readonly Animal[]): string[] {
  return animals.map((animal) => animal.name)
}

export const quiz: {
  q1: 'yes' | 'no'
  q2: 'yes' | 'no'
  q3: 'yes' | 'no'
  q4: 'yes' | 'no'
  q5: 'yes' | 'no'
} = {
  q1: 'yes', // arrays are covariant: Dog[] -> Animal[] is allowed
  q2: 'yes', // ...and that push compiles — the unsoundness the lesson warns about
  q3: 'no', // readonly arrays have no push — the safe variant
  q4: 'yes', // parameters are contravariant: an Animal-handler handles any Dog
  q5: 'no', // a Dog-handler needs .breed — not every Animal has one
}
