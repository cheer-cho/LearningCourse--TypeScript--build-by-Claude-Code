// Reference solution — checkpoint 3

export type ServerConfig = {
  readonly host: string
  readonly port: number
  env: 'dev' | 'prod'
  debug?: boolean
}

export type Overrides = {
  env?: 'dev' | 'prod'
  debug?: boolean
}

export function withOverrides(base: ServerConfig, overrides: Overrides): ServerConfig {
  return { ...base, ...overrides }
}

export type HeaderMap = { [name: string]: string }

export function withHeader(headers: HeaderMap, name: string, value: string): HeaderMap {
  return { ...headers, [name]: value }
}
