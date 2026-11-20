// Reference solution — ex02

export interface ServerConfig {
  host: string
  port: number
  protocol: 'http' | 'https'
}

export class ConfigBuilder<K extends keyof ServerConfig = never> {
  // Storing Pick<ServerConfig, K> makes K structural: a builder missing
  // keys is NOT assignable to one that has them all.
  constructor(private readonly data: Pick<ServerConfig, K>) {}

  withHost(host: string): ConfigBuilder<K | 'host'> {
    return new ConfigBuilder({ ...this.data, host } as Pick<ServerConfig, K | 'host'>)
  }

  withPort(port: number): ConfigBuilder<K | 'port'> {
    return new ConfigBuilder({ ...this.data, port } as Pick<ServerConfig, K | 'port'>)
  }

  withProtocol(protocol: ServerConfig['protocol']): ConfigBuilder<K | 'protocol'> {
    return new ConfigBuilder({ ...this.data, protocol } as Pick<ServerConfig, K | 'protocol'>)
  }

  // The `this` parameter demands the fully-supplied builder — calling
  // build on anything less is a compile error at the call site.
  build(this: ConfigBuilder<keyof ServerConfig>): ServerConfig {
    return { ...this.data }
  }
}

export function createBuilder(): ConfigBuilder<never> {
  return new ConfigBuilder({})
}
