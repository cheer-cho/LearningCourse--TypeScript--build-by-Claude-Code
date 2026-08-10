// Reference solution — puzzles

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false

export type First<T extends readonly unknown[]> = T extends readonly [infer F, ...unknown[]] ? F : never

export type Length<T extends readonly unknown[]> = T['length']

export type TupleToUnion<T extends readonly unknown[]> = T[number]

export type TupleToObject<T extends readonly (string | number | symbol)[]> = { [K in T[number]]: K }

export type Includes<T extends readonly unknown[], U> = T extends readonly [infer Head, ...infer Rest]
  ? Equal<Head, U> extends true
    ? true
    : Includes<Rest, U>
  : false

export type Push<T extends readonly unknown[], U> = [...T, U]

type Whitespace = ' ' | '\n' | '\t'

type TrimLeft<S extends string> = S extends `${Whitespace}${infer Rest}` ? TrimLeft<Rest> : S

type TrimRight<S extends string> = S extends `${infer Rest}${Whitespace}` ? TrimRight<Rest> : S

export type Trim<S extends string> = TrimLeft<TrimRight<S>>

export type Replace<S extends string, From extends string, To extends string> = From extends ''
  ? S
  : S extends `${infer Head}${From}${infer Tail}`
    ? `${Head}${To}${Tail}`
    : S
