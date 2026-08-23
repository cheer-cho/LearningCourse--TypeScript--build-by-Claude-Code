/**
 * ex06 — Declaration merging
 *
 * Two interface declarations with the SAME name merge into one type.
 * This is how you add fields to types you don't own (library types,
 * globals like Window). You'll do that for real in module 09 — here you
 * merge locally to see the mechanics.
 *
 * 1. Add a SECOND `interface AppGlobals` declaration (below the first)
 *    contributing `version: string`.
 * 2. Update makeGlobals — the compiler now demands both properties.
 *
 * Check: npm test -- 03 -t ex06
 */

export interface AppGlobals {
  appName: string
}

// TODO: declare AppGlobals AGAIN here, adding version: string.
export interface AppGlobals {
  version: string
}

export function makeGlobals (): AppGlobals {
  // TODO: once merged, this object must also provide `version`.
  return {
    appName: 'mastery',
    version: '0.0.1-beta'
  }
}
