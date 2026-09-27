// The mismatch: the same calendar day, two different instants.

const fromString = new Date('2026-01-15')      // date-only ISO -> parsed as UTC
const fromParts  = new Date(2026, 0, 15)       // year/month/day -> LOCAL midnight

console.log('TZ =', Intl.DateTimeFormat().resolvedOptions().timeZone)
console.log('fromString ', fromString.toISOString())
console.log('fromParts  ', fromParts.toISOString())
console.log('equal?     ', fromString.getTime() === fromParts.getTime())
console.log('hours apart', (fromParts.getTime() - fromString.getTime()) / 3.6e6)

// --- The subtle one: adding a time makes the STRING local too ---
console.log('\n-- string forms --')
console.log("'2026-01-15'          ", new Date('2026-01-15').toISOString(),          '<- UTC')
console.log("'2026-01-15T00:00:00' ", new Date('2026-01-15T00:00:00').toISOString(), '<- LOCAL')
console.log("'2026-01-15T00:00:00Z'", new Date('2026-01-15T00:00:00Z').toISOString(),'<- UTC (explicit)')

// --- Fix A: make both LOCAL ---
console.log('\n-- Fix A: both local --')
const localA = new Date('2026-01-15T00:00:00')   // force local by adding time
const localB = new Date(2026, 0, 15)
console.log('equal?', localA.getTime() === localB.getTime())

// --- Fix B: make both UTC ---
console.log('-- Fix B: both UTC --')
const utcA = new Date('2026-01-15')
const utcB = new Date(Date.UTC(2026, 0, 15))     // Date.UTC builds a UTC timestamp
console.log('equal?', utcA.getTime() === utcB.getTime())
