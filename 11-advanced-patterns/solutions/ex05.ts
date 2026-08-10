// Reference solution — ex05

export type DeepReadonly<T> = T extends (...args: any[]) => any
  ? T
  : T extends ReadonlyArray<infer E>
    ? readonly DeepReadonly<E>[]
    : T extends object
      ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
      : T

export type DeepPartial<T> = T extends (...args: any[]) => any
  ? T
  : T extends Array<infer E>
    ? Array<DeepPartial<E>>
    : T extends object
      ? { [K in keyof T]?: DeepPartial<T[K]> }
      : T

export function freezeConfig<T>(value: T): DeepReadonly<T> {
  if (typeof value === 'object' && value !== null) {
    for (const child of Object.values(value)) freezeConfig(child)
    Object.freeze(value)
  }
  return value as DeepReadonly<T>
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export function mergeDefaults<T>(defaults: T, patch: DeepPartial<T>): T {
  if (!isPlainObject(defaults) || !isPlainObject(patch)) {
    return patch as T
  }
  const result: Record<string, unknown> = { ...defaults }
  for (const key of Object.keys(patch)) {
    const base = defaults[key]
    const override = patch[key]
    result[key] =
      isPlainObject(base) && isPlainObject(override)
        ? mergeDefaults(base, override as DeepPartial<typeof base>)
        : override
  }
  return result as T
}
