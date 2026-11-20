// Reference solution — ex02

export type IsString<T> = T extends string ? true : false

export type ToArray<T> = T extends unknown[] ? T : T[]

export type StringOrNumber<T> = T extends string | number ? T : never

export function wrap<T>(value: T): ToArray<T> {
  return (Array.isArray(value) ? value : [value]) as ToArray<T>
}
