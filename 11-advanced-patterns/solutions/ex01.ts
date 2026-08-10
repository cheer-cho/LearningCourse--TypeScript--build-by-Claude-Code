// Reference solution — ex01

export type Brand<T, B extends string> = T & { readonly __brand: B }

export type UserId = Brand<string, 'UserId'>

export type Meters = Brand<number, 'Meters'>

export type Seconds = Brand<number, 'Seconds'>

export function userId(raw: string): UserId {
  return raw as UserId
}

export function meters(raw: number): Meters {
  return raw as Meters
}

export function seconds(raw: number): Seconds {
  return raw as Seconds
}

export function speed(distance: Meters, time: Seconds): number {
  return distance / time
}
