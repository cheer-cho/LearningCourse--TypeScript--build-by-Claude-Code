// Recap: `value is Vault` is a TYPE PREDICATE (Module 05, ex07).
// It is a special return type. At runtime the function returns a boolean.
// At compile time it tells the checker: "if I return true, `value` IS a Vault".

class Vault {
  constructor(public secret: string) {}

  static isVault(value: unknown): value is Vault {
    return value instanceof Vault
  }
}

// ── Without a predicate: plain boolean, TS learns nothing ──────────────
function looksLikeVaultPlain(value: unknown): boolean {
  return value instanceof Vault
}

// ── With a predicate: TS narrows inside the `if` ───────────────────────
function open(thing: unknown) {
  if (looksLikeVaultPlain(thing)) {
    // thing is still `unknown` here — the boolean carries no type info.
    // thing.secret            // ❌ error TS18046: 'thing' is of type 'unknown'.
  }

  if (Vault.isVault(thing)) {
    // thing is now `Vault` — the predicate narrowed it.
    console.log('secret:', thing.secret) // ✅
  } else {
    // and here TS knows thing is NOT a Vault (still unknown, but excluded)
    console.log('not a vault:', thing)
  }
}

open(new Vault('gold'))
open('just a string')

// Bonus: predicates also power .filter() narrowing
const mixed: unknown[] = [new Vault('a'), 42, new Vault('b')]
const vaults: Vault[] = mixed.filter(Vault.isVault) // Vault[] not unknown[]
console.log(vaults.map(v => v.secret))
