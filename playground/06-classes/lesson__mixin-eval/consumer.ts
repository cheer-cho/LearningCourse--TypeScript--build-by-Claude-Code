// Importing broken.ts for an innocent helper still runs its top-level mixin call.
// Run: npm run playground playground/06-classes/lesson__mixin-eval/consumer.ts
export {} // make this file a module, so top-level `await` is allowed

console.log('--- consumer: importing broken.ts, only wants `add`')
try {
  const { add } = await import('./broken')
  console.log('add(1, 2) ->', add(1, 2))
} catch (e) {
  console.log('import failed:', (e as Error).message)
}
