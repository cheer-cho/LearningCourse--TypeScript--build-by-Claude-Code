// strictPropertyInitialization demo
// Rule: a class property must be definitely assigned
// before the constructor finishes.
// Run: npm run playground strict-property-init
//   (the type-check step shows the two ❌ errors; the run shows why they matter)

class User {
  // ❌ Error: never assigned anywhere.
  name: string;

  // ❌ Error too! TypeScript is not sure init() runs.
  email: string;

  // ✅ OK: initializer at the declaration.
  role: string = "student";

  // ✅ OK: assigned in the constructor.
  id: number;

  // ✅ OK (but risky): `!` tells TS "trust me, it will be set".
  nickname!: string;

  // ✅ OK: `undefined` is part of the type, so no value is fine.
  bio: string | undefined;

  constructor() {
    this.id = 1;
    // this.name = "cheer";
    // this.email = "1@1.com";
    this.init(); // TS does NOT follow this call for `email`.
  }

  init() {
    this.email = "a@b.com";
  }
}

const u = new User();
console.log("u.name     ->", u.name);     // undefined — but typed `string`: the lie the flag prevents
console.log("u.email    ->", u.email);    // "a@b.com" — init() did run, TS just can't prove it
console.log("u.role     ->", u.role);
console.log("u.id       ->", u.id);
console.log("u.nickname ->", u.nickname); // undefined — `!` silenced the check, nothing set it
console.log("u.bio      ->", u.bio);      // undefined — honest: the type allows it
