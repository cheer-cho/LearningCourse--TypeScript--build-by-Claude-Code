/**
 * ✦ CHECKPOINT 12 — Real-World TypeScript
 *
 * An env-configured, zod-validated settings loader. Combines the whole
 * module: safe JSON parsing (ex04), a zod schema that derives its own
 * static type (ex03), and an env var fallback (ex02) — all funneled
 * through the Result pattern so nothing throws.
 * Each declaration below explains its own job.
 *
 * Passing `npm test -- 12` completes this module. 🎉
 */
import { z } from 'zod'

// Given: the Result pattern — errors as values, not throws.
export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E }

// What a settings FILE may contain — a zod object:
//   - apiUrl: string, OPTIONAL in the JSON itself (it can come from the
//     env instead)
//   - retries: a non-negative integer
//   - featureFlags: array of strings
export const SettingsSchema = z.unknown()

// The fully-resolved shape the rest of the app uses — everything
// REQUIRED (apiUrl gets filled in from the env when the JSON lacks it):
//   { apiUrl: string; retries: number; featureFlags: string[] }
export type Settings = unknown

// Load settings from a JSON string, step by step:
//   a. Parse `text` as JSON. Invalid JSON -> Result error with the
//      caught error's message (or 'invalid JSON' when it's not an
//      Error instance).
//   b. Validate the parsed value with SettingsSchema.safeParse.
//      Invalid shape -> Result error with the first issue's message
//      (or 'invalid settings' if the issue list is somehow empty).
//   c. If apiUrl is missing from the parsed data, read it from
//      env['API_URL']. Still missing -> Result error
//      'Missing required env var: API_URL'.
//   d. Otherwise: Result ok with the fully-resolved Settings.
//   Signature: (text: string, env?: Record<string, string | undefined>)
//               => Result<Settings, string>
export function loadSettings(text: any, env: any = process.env): any {
  throw new Error('TODO: implement loadSettings')
}
