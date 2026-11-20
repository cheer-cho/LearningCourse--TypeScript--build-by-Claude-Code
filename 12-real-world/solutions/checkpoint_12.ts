// Reference solution — checkpoint 12

import { z } from 'zod'

export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E }

export const SettingsSchema = z.object({
  apiUrl: z.string().optional(),
  retries: z.number().int().nonnegative(),
  featureFlags: z.array(z.string()),
})

export type Settings = {
  apiUrl: string
  retries: number
  featureFlags: string[]
}

export function loadSettings(
  text: string,
  env: Record<string, string | undefined> = process.env,
): Result<Settings, string> {
  let parsedJson: unknown
  try {
    parsedJson = JSON.parse(text)
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'invalid JSON' }
  }

  const parsed = SettingsSchema.safeParse(parsedJson)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'invalid settings' }
  }

  const apiUrl = parsed.data.apiUrl ?? env['API_URL']
  if (apiUrl === undefined) {
    return { ok: false, error: 'Missing required env var: API_URL' }
  }

  return {
    ok: true,
    value: { apiUrl, retries: parsed.data.retries, featureFlags: parsed.data.featureFlags },
  }
}
