// Reference solution — ex04

export type Car = { drive: () => string }
export type Boat = { sail: () => string }

export function move(vehicle: Car | Boat): string {
  if ('drive' in vehicle) {
    return vehicle.drive()
  }
  return vehicle.sail()
}

export function toIso(stamp: Date | string): string {
  if (stamp instanceof Date) {
    return stamp.toISOString()
  }
  return new Date(stamp).toISOString()
}

export function sizeOf(collection: string[] | Set<string>): number {
  if (collection instanceof Set) {
    return collection.size
  }
  return collection.length
}
