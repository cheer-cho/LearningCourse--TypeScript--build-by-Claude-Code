// Reference solution — ex04

export interface Animal {
  name: string
}

export interface Pet extends Animal {
  owner: string
}

export interface Dog extends Pet {
  breed: string
  bark(): string
}

export function makeDog(name: string, owner: string, breed: string): Dog {
  return {
    name,
    owner,
    breed,
    bark: () => 'Woof!',
  }
}
