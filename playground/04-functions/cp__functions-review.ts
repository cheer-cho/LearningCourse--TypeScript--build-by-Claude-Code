// Checkpoint 4 review — three small things the runtime already does for you.

// 1. padStart already leaves long strings alone.
console.log(JSON.stringify('1234'.padStart(3, ' '))) // "1234"

// 2. join on an empty array is already ''.
console.log(JSON.stringify([].join('-')))            // ""

// 3. Indexing an empty string vs charAt.
console.log(''[0])                                    // undefined
console.log(JSON.stringify(''.charAt(0)))             // ""
console.log(JSON.stringify('abc'.charAt(0)))          // "a"
