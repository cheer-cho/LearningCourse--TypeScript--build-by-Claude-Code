// Reference solution — ex08

export type Json = string | number | boolean | null | Json[] | { [key: string]: Json }

export type DeepReadonly<T> = T extends (infer U)[]
  ? readonly DeepReadonly<U>[]
  : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T

export type Split<S extends string, D extends string> = S extends `${infer Head}${D}${infer Rest}`
  ? [Head, ...Split<Rest, D>]
  : [S]
