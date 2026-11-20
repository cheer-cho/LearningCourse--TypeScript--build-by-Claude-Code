// Checkpoint 4 review — three small things the runtime already does for you.
// Run: npm run playground cp__functions-review

// 1. padStart already leaves long strings alone.
console.log("'1234'.padStart(3, ' ') ->", JSON.stringify('1234'.padStart(3, ' '))) // "1234"

// 2. join on an empty array is already ''.
console.log("[].join('-')           ->", JSON.stringify([].join('-')))            // ""

// 3. Indexing an empty string vs charAt.
console.log("''[0]                  ->", ''[0])                                    // undefined
console.log("''.charAt(0)           ->", JSON.stringify(''.charAt(0)))             // ""
console.log("'abc'.charAt(0)        ->", JSON.stringify('abc'.charAt(0)))          // "a"
