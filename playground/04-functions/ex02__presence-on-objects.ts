type Settings = { debug?: boolean; theme?: string }

const a: Settings = {}                    // debug is MISSING
const b: Settings = { debug: undefined }  // debug is PRESENT, value undefined
const c: Settings = { debug: false }      // debug is PRESENT, value false

for (const [name, s] of [['a {}', a], ['b {debug:undefined}', b], ['c {debug:false}', c]] as const) {
  console.log(
    `${name.padEnd(22)} in:${String('debug' in s).padEnd(6)}` +
    `!==undefined:${String(s.debug !== undefined).padEnd(6)}` +
    `truthy:${Boolean(s.debug)}`
  )
}
