// Reference solution — ex02

export type Config = {
  readonly host: string
  readonly port: number
  debug: boolean
}

export function withDebug(config: Config, debug: boolean): Config {
  return { ...config, debug }
}

export function movePort(config: Config, port: number): Config {
  return { ...config, port }
}
