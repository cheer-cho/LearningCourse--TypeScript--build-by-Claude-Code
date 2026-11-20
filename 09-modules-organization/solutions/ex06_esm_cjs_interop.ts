// Reference solution — ex06

import legacyDefault from './ex06-legacy'
import * as legacyNS from './ex06-legacy'

export const legacyGreeting: string = legacyDefault('Ada')
export const legacyVersion: string = legacyDefault.version

export const viaNamespace: string = legacyNS.default('Ada')

export const quiz: { q1: 'yes' | 'no'; q2: 'yes' | 'no'; q3: 'yes' | 'no' } = {
  q1: 'yes',
  q2: 'no',
  q3: 'no',
}
