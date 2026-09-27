// Where does `any` actually lose you protection?

function withAny(value: any) {
  value.lenght; // ✅ NO error — any = "trust me", checking is OFF
  value();      // ✅ NO error — you could even call it!

  if (typeof value === 'string') {
    // narrowing turns checking back ON: value is `string` here
    // value.lenght; // ❌ error if uncommented
  }
}

function withUnknown(value: unknown) {
  value.lenght; // ❌ error IMMEDIATELY — unknown = "prove it first"

  if (typeof value === 'string') {
    value.length; // ✅ ok — you proved it
  }
}
