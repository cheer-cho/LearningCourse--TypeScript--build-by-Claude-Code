// Reference solution — ex02

export function requireEnv(
  name: string,
  env: Record<string, string | undefined> = process.env,
): string {
  const value = env[name]
  if (value === undefined) {
    throw new Error(`Missing required env var: ${name}`)
  }
  return value
}

export type ReadTextFile = (path: string) => Promise<string>

export async function loadLines(path: string, readTextFile: ReadTextFile): Promise<string[]> {
  const text = await readTextFile(path)
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
}
