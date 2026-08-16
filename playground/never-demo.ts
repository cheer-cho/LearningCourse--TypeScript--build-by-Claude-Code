// Demo: exhaustiveness checking with `never` (traffic lights, not shapes!)

type Light = 'red' | 'yellow' | 'green'

function assertNever(value: never): never {
  throw new Error(`Unhandled: ${value}`)
}

// ✅ Complete switch — compiles fine.
function action(light: Light): string {
  switch (light) {
    case 'red': return 'stop'
    case 'yellow': return 'slow'
    case 'green': return 'go'
    default:
      return assertNever(light) // light is `never` here — all cases handled
  }
}

// ❌ Missing the 'yellow' case — watch the compiler catch it.
function brokenAction(light: Light): string {
  switch (light) {
    case 'red': return 'stop'
    case 'green': return 'go'
    default:
      return assertNever(light) // ERROR: light is still 'yellow' here!
  }
}

console.log(action('green'))
