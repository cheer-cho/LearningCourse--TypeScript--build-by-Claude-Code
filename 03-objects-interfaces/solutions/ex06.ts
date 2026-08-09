// Reference solution — ex06

export interface AppGlobals {
  appName: string
}

export interface AppGlobals {
  version: string
}

export function makeGlobals(): AppGlobals {
  return { appName: 'mastery', version: '1.0.0' }
}
