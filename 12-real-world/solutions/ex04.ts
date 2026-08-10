// Reference solution — ex04

export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E }

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

export function safeJsonParse(text: string): Result<JsonValue, string> {
  try {
    const value = JSON.parse(text) as JsonValue
    return { ok: true, value }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'invalid JSON' }
  }
}
