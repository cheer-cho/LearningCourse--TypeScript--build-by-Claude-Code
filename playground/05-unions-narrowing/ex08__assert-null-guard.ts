// Does the first guard in assertIsUser ever fire?
function guardFires(value: unknown): boolean {
  return typeof value !== 'object' && value === null;
}

for (const v of [null, 'Ada', 42, undefined, {}, [], { name: 'Ada', age: 1 }]) {
  console.log(String(v).padEnd(16), 'typeof =', String(typeof v).padEnd(10), 'guard fires:', guardFires(v));
}

console.log('\nWhat actually happens on null with the current code:');
try {
  const { name } = (null as unknown) as Record<string, unknown>;
  console.log(name);
} catch (e) {
  console.log((e as Error).constructor.name + ':', (e as Error).message);
}
