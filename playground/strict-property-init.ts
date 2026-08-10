// strictPropertyInitialization demo
// Rule: a class property must be definitely assigned
// before the constructor finishes.

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
