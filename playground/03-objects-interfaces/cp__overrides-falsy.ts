// Applying optional overrides: `!== undefined` keeps `false`; a truthy check drops it.
// Run: npm run playground overrides-falsy
//   (the type-check step shows one ❌ TS2379: `{ env: undefined }` is rejected
//    by exactOptionalPropertyTypes; the run shows what would happen anyway)

type ServerConfig = { readonly host: string; readonly port: number; env: 'dev' | 'prod'; debug?: boolean };
type Overrides = { env?: 'dev' | 'prod'; debug?: boolean };

// ✅ The checkpoint version: copy a key only when it is really present.
function withOverrides(base: ServerConfig, overrides: Overrides): ServerConfig {
  return {
    ...base,
    ...(overrides.env !== undefined && { env: overrides.env }),
    ...(overrides.debug !== undefined && { debug: overrides.debug }),
  };
}

// ⚠️ Truthy guard: `false` looks like "missing", so it is skipped.
function withOverridesTruthy(base: ServerConfig, overrides: Overrides): ServerConfig {
  return {
    ...base,
    ...(overrides.env && { env: overrides.env }),
    ...(overrides.debug && { debug: overrides.debug }),
  };
}

// ⚠️ Plain spread: correct for `false`, but copies an explicit `undefined`.
function withOverridesNaive(base: ServerConfig, overrides: Overrides): ServerConfig {
  return { ...base, ...overrides };
}

const base: ServerConfig = { host: 'x', port: 80, env: 'prod', debug: true };

console.log('guarded, debug: false     ->', withOverrides(base, { debug: false }));
console.log('guarded, env: undefined   ->', withOverrides(base, { env: undefined }));
console.log('guarded, {}               ->', withOverrides(base, {}));
console.log('truthy,  debug: false     ->', withOverridesTruthy(base, { debug: false }));
// `as unknown as` fakes a project WITHOUT exactOptionalPropertyTypes, where this is legal.
const explicitUndefined = { env: undefined } as unknown as Overrides;
console.log('naive,   env: undefined   ->', withOverridesNaive(base, explicitUndefined));

// Why `...(cond && { k: v })` works: spreading `false` adds nothing.
const skipped = false as false | { debug: boolean };
console.log('spread of false           ->', { ...skipped });
