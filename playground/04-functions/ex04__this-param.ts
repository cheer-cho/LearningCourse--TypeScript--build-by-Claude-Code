// A `this` parameter turns "detached method" from a runtime crash into a compile error.
// Run: npm run playground ex04__this-param

interface Counter {
  count: number;
  increment(this: Counter): number;
}

const counter: Counter = {
  count: 0,
  increment() {
    return ++this.count;
  },
};

console.log('counter.increment()    ->', counter.increment());  // OK: this = counter

const f = counter.increment;
try {
  f();                          // ERROR: this would be undefined
} catch (e) {
  console.log('f() detached          ->', (e as Error).message);
}

console.log('f.call(counter)       ->', f.call(counter));  // OK: this explicitly supplied
const bound = counter.increment.bind(counter);
console.log('bound()               ->', bound());          // OK: bind returns a () => number
