// SCRIPT too — so it shares the global scope with script-a.ts.
interface Config { b: number }  // MERGES with script-a's Config. No error, no warning.
const shared = 2                // COLLIDES -> error TS2451.
