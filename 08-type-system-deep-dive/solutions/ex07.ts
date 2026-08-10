// Reference solution — ex07

export type Greeting<Name extends string> = `Hello, ${Name}!`

export type EventHandlerName<T extends string> = `on${Capitalize<T>}`

export type ExtractParam<T extends string> = T extends `${string}:${infer Param}` ? Param : never

export type ParseQuery<T extends string> = T extends `${infer K}=${infer V}` ? { key: K; value: V } : never
