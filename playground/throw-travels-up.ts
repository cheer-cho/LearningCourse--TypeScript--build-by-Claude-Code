// How a thrown error travels up through function calls.

function inner(): never {
  console.log('  inner: about to throw');
  throw new Error('age must be a number');
  // nothing below this line ever runs
}

// ---- Version A: no try/catch. The error just passes through. ----
function middleA(): string {
  console.log(' middleA: calling inner');
  inner();
  console.log(' middleA: this line is SKIPPED');   // never printed
  return 'hello';
}

// ---- Version B: catch, then rethrow a blank error. ----
function middleB(): string {
  try {
    console.log(' middleB: calling inner');
    inner();
    return 'hello';
  } catch (error) {
    console.log(' middleB: caught "' + (error as Error).message + '", throwing a blank one instead');
    throw new Error();
  }
}

console.log('=== Version A (no try/catch) ===');
try {
  middleA();
} catch (error) {
  console.log('caller received message: "' + (error as Error).message + '"');
}

console.log('\n=== Version B (try/catch + rethrow blank) ===');
try {
  middleB();
} catch (error) {
  console.log('caller received message: "' + (error as Error).message + '"');
}
