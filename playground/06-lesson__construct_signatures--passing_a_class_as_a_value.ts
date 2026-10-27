// Q: "interface PluginConstructor { new (name: string): Plugin }" — what does it do?
//
// Two interfaces, two *sides* of a class:
//   Plugin            → the INSTANCE side: what `new Echo(...)` gives you
//   PluginConstructor → the STATIC side:   what `Echo` itself is (a thing you can `new`)
//
// `implements` can only promise the instance side. To talk about the
// constructor, you write an interface with a `new` signature and pass the
// CLASS (not an instance) as an ordinary function argument.

// Gotcha found while writing this file: without an import/export this file is a
// global *script*, and `interface Plugin` silently MERGES with the DOM lib's
// built-in `Plugin` (navigator.plugins). Suddenly every class "is missing
// description, filename, length…". `export {}` makes the file a module and
// keeps our `Plugin` local.
export {}

interface Plugin {
  run(): string
}

interface PluginConstructor {
  new (name: string): Plugin // "call me with `new` and one string, you get a Plugin back"
}

// `Ctor` is NOT an instance. It is the class itself, so `new Ctor(...)` works.
function boot(Ctor: PluginConstructor, name: string): Plugin {
  return new Ctor(name)
}

// ── 1. A class that matches ──────────────────────────────────────────────
class Echo implements Plugin {
  constructor(private name: string) {}
  run(): string { return this.name }
}

console.log(boot(Echo, 'hello').run()) // 'hello'

// ── 2. Any other class with the same constructor shape also fits ─────────
class Shout implements Plugin {
  constructor(private name: string) {}
  run(): string { return this.name.toUpperCase() + '!' }
}

console.log(boot(Shout, 'hello').run()) // 'HELLO!'

// ── 3. `implements` is optional — the check is structural ────────────────
// Never wrote `implements Plugin`, but has `constructor(string)` and `run()`.
class Silent {
  constructor(_name: string) {}
  run(): string { return '' }
}

console.log(JSON.stringify(boot(Silent, 'x').run())) // '""'

// ── 4. What gets rejected ────────────────────────────────────────────────

// Constructor takes a number, but PluginConstructor promised a string.
class Counter implements Plugin {
  constructor(private start: number) {}
  run(): string { return String(this.start) }
}
// ❌ error TS2345: Argument of type 'typeof Counter' is not assignable to parameter of type 'PluginConstructor'.
//    Types of parameters 'start' and 'name' are incompatible. Type 'string' is not assignable to type 'number'.
// @ts-expect-error
boot(Counter, 'one')

// Instance side is wrong: no `run()`.
class Mute {
  constructor(_name: string) {}
}
// ❌ error TS2345: Argument of type 'typeof Mute' is not assignable to parameter of type 'PluginConstructor'.
//    Property 'run' is missing in type 'Mute' but required in type 'Plugin'.
// @ts-expect-error
boot(Mute, 'shh')

// Passing an INSTANCE instead of the CLASS — you cannot `new` an instance.
// ❌ error TS2345: Argument of type 'Echo' is not assignable to parameter of type 'PluginConstructor'.
//    Type 'Echo' provides no match for the signature 'new (name: string): Plugin'.
try {
  // @ts-expect-error
  boot(new Echo('oops'), 'hello')
} catch (e) {
  // The type error above is guarding against a REAL runtime crash:
  console.log('runtime:', (e as Error).message) // runtime: Ctor is not a constructor
}

// ── 5. Why bother? A registry that creates plugins by name, later ────────
const registry: Record<string, PluginConstructor> = { echo: Echo, shout: Shout }

for (const key of ['echo', 'shout']) {
  console.log(key, '→', boot(registry[key], 'hi').run())
}
// echo  → hi
// shout → HI!
