// Reference solution — ex07

export type Fish = { name: string; swim: () => string }
export type Bird = { name: string; fly: () => string }

export function looksLikeFish(pet: Fish | Bird): boolean {
  return 'swim' in pet
}

export function isFish(pet: Fish | Bird): pet is Fish {
  return 'swim' in pet
}

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function swimmers(pets: (Fish | Bird)[]): Fish[] {
  return pets.filter(isFish)
}
