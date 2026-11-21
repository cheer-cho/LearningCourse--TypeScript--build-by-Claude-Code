/**
 * ex02 — Node typing: env vars and injected file readers
 *
 * Two everyday Node facts:
 *   · `process.env.X` is `string | undefined` — every var might be
 *     missing. Handle the undefined ONCE, early.
 *   · Functions that touch the filesystem are easiest to test when the
 *     IO is injected — the type of the injected reader must line up
 *     with node:fs/promises' readFile called with 'utf8'.
 *
 * 1. requireEnv(name, env = process.env): return the value, or throw
 *    Error(`Missing required env var: ${name}`) when it's undefined.
 *    Type env as Record<string, string | undefined>.
 * 2. ReadTextFile: (path: string) => Promise<string>. The real thing
 *    would be `(p) => readFile(p, 'utf8')` — the tests check that
 *    assignment compiles.
 * 3. loadLines(path, readTextFile): read the text, split on '\n', trim
 *    each line, drop empty lines.
 *
 * Check: npm test -- 12 -t ex02
 */

// TODO: (name: string, env?: Record<string, string | undefined>) => string.
export function requireEnv(name: any, env: any = process.env): any {
  throw new Error('TODO: implement requireEnv')
}

// TODO: (path: string) => Promise<string>.
export type ReadTextFile = unknown

// TODO: (path: string, readTextFile: ReadTextFile) => Promise<string[]>.
export async function loadLines(path: any, readTextFile: any): Promise<any> {
  throw new Error('TODO: implement loadLines')
}
