// Reference solution — ex03

import { z } from 'zod'

export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E }

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  tags: z.array(z.string()),
})

export type User = z.infer<typeof UserSchema>

export function parseUser(input: unknown): Result<User, string> {
  const parsed = UserSchema.safeParse(input)
  if (parsed.success) {
    return { ok: true, value: parsed.data }
  }
  return { ok: false, error: parsed.error.issues[0]?.message ?? 'invalid user' }
}
