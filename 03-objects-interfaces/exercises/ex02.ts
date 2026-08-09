/**
 * ex02 — readonly properties
 *
 * 1. Define Config: host and port are READONLY; debug is a normal boolean.
 * 2. Implement withDebug: return a NEW config with debug replaced.
 *    You cannot mutate config.debug… wait, debug isn't readonly — but
 *    do it immutably anyway (spread), because host/port force a new
 *    object for any change and mixing styles breeds bugs.
 * 3. Implement movePort: return a NEW config with a different port.
 *    Note you CANNOT assign config.port — the compiler stops you.
 *
 * Check: npm test -- 03 -t ex02
 */

// TODO: host and port readonly.
export type Config = unknown

// TODO: type the parameters, then implement (no mutation).
export function withDebug(config: any, debug: any): any {
  throw new Error('TODO: implement withDebug')
}

// TODO: type the parameters, then implement (no mutation).
export function movePort(config: any, port: any): any {
  throw new Error('TODO: implement movePort')
}
