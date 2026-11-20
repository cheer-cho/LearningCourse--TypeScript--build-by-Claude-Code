// Where does `any` actually lose you protection?
// Run: npm run playground any-vs-unknown
// Expect ONE type error (TS18046) on `value.lenght` in withUnknown — that's the lesson.

function withAny(value: any) {
  console.log('withAny value.lenght ->', value.lenght); // ✅ NO error — any = "trust me", checking is OFF
  value();      // ✅ NO error — you could even call it!

  if (typeof value === 'string') {
    // narrowing turns checking back ON: value is `string` here
    // value.lenght; // ❌ error if uncommented
  }
}

function withUnknown(value: unknown) {
  value.lenght; // ❌ error IMMEDIATELY — unknown = "prove it first"

  if (typeof value === 'string') {
    console.log('withUnknown value.length ->', value.length); // ✅ ok — you proved it
  }
}

// The compiler let withAny call a string. Runtime does not.
try {
  withAny('hey')
} catch (e) {
  console.log('withAny crashed ->', (e as Error).message)
}

withUnknown('hey')
