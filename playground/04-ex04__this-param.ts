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

counter.increment();            // OK: this = counter

const f = counter.increment;
f();                            // ERROR: this would be undefined

f.call(counter);                // OK: this explicitly supplied
const bound = counter.increment.bind(counter);
bound();                        // OK: bind returns a () => number
