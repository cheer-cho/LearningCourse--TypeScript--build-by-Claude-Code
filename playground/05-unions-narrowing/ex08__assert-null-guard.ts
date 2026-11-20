// Does the first guard in assertIsUser ever fire? (`&&` = old draft, `||` = fixed version)
// Run: npm run playground assert-null-guard
function guardFires(value: unknown): boolean {
  return typeof value !== 'object' && value === null;   // old draft: can never be true
}
function fixedGuardFires(value: unknown): boolean {
  return typeof value !== 'object' || value === null;   // what ex08 uses now
}

for (const v of [null, 'Ada', 42, undefined, {}, [], { name: 'Ada', age: 1 }]) {
  console.log(
    JSON.stringify(v) ?? 'undefined',
    '-> typeof =', typeof v,
    '| && guard fires:', guardFires(v),
    '| || guard fires:', fixedGuardFires(v),
  );
}

console.log('\nWhat happens on null when the && guard lets it through:');
try {
  const { name } = (null as unknown) as Record<string, unknown>;
  console.log(name);
} catch (e) {
  console.log('destructure null ->', (e as Error).constructor.name + ':', (e as Error).message);
}
