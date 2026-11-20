// Exhaustiveness checking with `never`.
// Run: npm run playground never-demo
// Expect ONE type error (TS2345) inside brokenAction — that is the check working.

// (traffic lights, not shapes!)

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

console.log("action('green') ->", action('green'))

// The broken version still runs (tsx ignores type errors).
// 'yellow' falls into default, and assertNever throws at runtime.
try {
  brokenAction('yellow')
} catch (e) {
  console.log("brokenAction('yellow') threw ->", (e as Error).message)
}
