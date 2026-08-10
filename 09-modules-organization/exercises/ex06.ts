/**
 * ex06 — ESM/CJS interop: default vs namespace imports
 *
 * Most of npm still ships CommonJS: `module.exports = fn`. A CJS module
 * has no real `default` export — `module.exports` *is* the module.
 * `esModuleInterop` (on in this course) maps that whole-module value onto
 * a `default` import. A NAMESPACE import (`import * as`) never needs
 * esModuleInterop, but it is also never callable — you go through its
 * `.default` property instead. ex06-legacy models exactly the shape a
 * CJS `module.exports = fn` package produces.
 *
 * 1. legacyGreeting: call the DEFAULT import of ex06-legacy with 'Ada'.
 * 2. legacyVersion: read `.version` off that SAME default import.
 * 3. viaNamespace: call the SAME function through the NAMESPACE import's
 *    `.default` property, with 'Ada'.
 * 4. Quiz — answer 'yes' or 'no' (see LESSON.md's esModuleInterop table):
 *      q1: does a DEFAULT import need esModuleInterop for a
 *          `module.exports = fn` package?
 *      q2: does a NAMESPACE import (`import * as`) need esModuleInterop?
 *      q3: is a namespace import itself (not its `.default`) callable?
 *
 * Check: npm test -- 09 -t ex06
 */

import legacyDefault from './ex06-legacy'
import * as legacyNS from './ex06-legacy'

// TODO 1 & 2: use legacyDefault to compute these.
export const legacyGreeting: string = 'TODO'
export const legacyVersion: string = 'TODO'

// TODO 3: use legacyNS.default to compute this.
export const viaNamespace: string = 'TODO'

// TODO 4: fix the answers.
export const quiz: { q1: 'yes' | 'no'; q2: 'yes' | 'no'; q3: 'yes' | 'no' } = {
  q1: 'no',
  q2: 'yes',
  q3: 'yes',
}
