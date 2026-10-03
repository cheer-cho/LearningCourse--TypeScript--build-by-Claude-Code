// Dynamic `this`: a regular function's `this` is set by HOW you call it.
// TypeScript's `this:` parameter just checks call sites at compile time.
// Run: npx tsx playground/06-lesson__this-binding.ts

export {}; // module scope, so `counter` doesn't clash with other playgrounds

class Counter {
  count = 0;

  // `this: Counter` is a fake parameter — erased from the JS output.
  inc(this: Counter): void {
    this.count++;
  }

  // Arrow field: `this` captured once, when the instance is built.
  incArrow = (): void => {
    this.count++;
  };

  // Same as `inc`, but WITHOUT the `this:` annotation.
  incUnchecked(): void {
    this.count++;
  }
}

const counter = new Counter();

// 1. Normal call: the `.` is part of the call → this = counter
counter.inc();
console.log('1. counter.inc()          →', counter.count); // 1

// 2. Detached: reading `counter.inc` grabs the function, not the object.
const detached = counter.inc;
try {
  // @ts-expect-error TS2684 — 'this' of type 'void' is not assignable to 'Counter'
  detached();
} catch (e) {
  console.log('2. detached()             → 💥', (e as Error).message);
}

// 3. Same bug, no annotation: TS stays silent, runtime still crashes.
//    This is what the `this:` parameter protects you from.
const unchecked = counter.incUnchecked;
try {
  unchecked(); // no compile error!
} catch (e) {
  console.log('3. unchecked() (no this:) → 💥', (e as Error).message);
}

// 4. Fixes
counter.inc.bind(counter)();
console.log('4a. bind(counter)()       →', counter.count); // 2

detached.call(counter);
console.log('4b. detached.call(counter)→', counter.count); // 3

const safe = counter.incArrow;
safe();
console.log('4c. arrow field safe()    →', counter.count); // 4

// 5. Where it bites in real code: passing a method as a callback.
[1, 2].forEach(counter.incArrow); // ✅ arrow keeps its `this`
console.log('5a. forEach(incArrow)     →', counter.count); // 6

// ⚠️ GOTCHA: no compile error here! forEach's callback type doesn't
// declare a `this`, and TS only checks `this:` when the target type
// declares one. The check catches direct calls (#2), not every hand-off.
try {
  [1, 2].forEach(counter.inc);
} catch (e) {
  console.log('5b. forEach(inc)          → 💥', (e as Error).message);
}

// 6. Methods live on the prototype; arrow fields live on each instance.
const other = new Counter();
console.log('6. shared method?', counter.inc === other.inc);           // true
console.log('   shared arrow? ', counter.incArrow === other.incArrow); // false

// ── Your turn ──────────────────────────────────────────────
// Predict the output, then uncomment and run:
//
// class Greeter {
//   name = 'Ada';
//   hi() { return `hi ${this?.name}`; }
// }
// const g = new Greeter();
// setTimeout(() => console.log(g.hi()), 0);
// setTimeout(() => console.log((0, g.hi)()), 0);
