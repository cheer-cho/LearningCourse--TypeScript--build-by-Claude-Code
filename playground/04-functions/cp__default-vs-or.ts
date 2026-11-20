// Two ways to "fall back to a space". They differ on exactly one input.

function padDefault(text: string, width: number, char = ' ') {
  return text.padStart(width, char)
}

function padOr(text: string, width: number, char?: string) {
  const usingChar = char || ' '
  return text.padStart(width, usingChar)
}

const show = (v: string) => JSON.stringify(v)

console.log('argument left out:')
console.log('  default ->', show(padDefault('7', 3)))   // "  7"
console.log('  ||      ->', show(padOr('7', 3)))        // "  7"

console.log('argument is "0":')
console.log('  default ->', show(padDefault('7', 3, '0'))) // "007"
console.log('  ||      ->', show(padOr('7', 3, '0')))      // "007"

console.log('argument is "" (passed on purpose):')
console.log('  default ->', show(padDefault('7', 3, ''))) // "7"    <- caller's choice kept
console.log('  ||      ->', show(padOr('7', 3, '')))      // "  7"  <- caller's choice thrown away
