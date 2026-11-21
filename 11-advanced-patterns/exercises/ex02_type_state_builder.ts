/**
 * ex02 — Builder with a type-state fluent API
 *
 * A builder where `.build()` REFUSES TO COMPILE until every required
 * field has been supplied. The trick: a generic parameter K accumulates
 * the keys supplied so far, and `build` uses a `this` parameter that only
 * accepts the builder once K covers every key.
 *
 * 1. Give ConfigBuilder a private `data` field of type
 *    Pick<ServerConfig, K> (set it via the constructor). Storing K
 *    structurally is what makes incomplete builders incompatible with
 *    complete ones — a generic that appears nowhere in the body is
 *    invisible to assignability.
 * 2. Each with* method returns ConfigBuilder<K | 'thatKey'> containing
 *    the old data plus the new field. (A single `as` cast on the spread
 *    object is expected — TS can't relate the spread to the Pick.)
 * 3. build(this: ConfigBuilder<keyof ServerConfig>): ServerConfig —
 *    callable only when all three keys have been supplied.
 * 4. createBuilder() starts the chain with no keys: ConfigBuilder<never>.
 *
 *    createBuilder().withHost('h').withPort(1).withProtocol('http').build()
 *      -> { host: 'h', port: 1, protocol: 'http' }
 *    createBuilder().withHost('h').build()   // must NOT compile
 *
 * Check: npm test -- 11 -t ex02
 */

export interface ServerConfig {
  host: string
  port: number
  protocol: 'http' | 'https'
}

export class ConfigBuilder<K extends keyof ServerConfig = never> {
  // TODO: private readonly data: Pick<ServerConfig, K> (via constructor)

  // TODO: return ConfigBuilder<K | 'host'>
  withHost(host: any): any {
    throw new Error('TODO: implement withHost')
  }

  // TODO: return ConfigBuilder<K | 'port'>
  withPort(port: any): any {
    throw new Error('TODO: implement withPort')
  }

  // TODO: return ConfigBuilder<K | 'protocol'>
  withProtocol(protocol: any): any {
    throw new Error('TODO: implement withProtocol')
  }

  // TODO: only callable once every key is in K (this parameter!).
  build(): any {
    throw new Error('TODO: implement build')
  }
}

// TODO: return an empty ConfigBuilder<never>.
export function createBuilder(): any {
  throw new Error('TODO: implement createBuilder')
}
