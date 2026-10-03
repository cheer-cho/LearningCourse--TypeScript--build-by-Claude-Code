console.log('--- consumer: importing broken.ts, only wants `add`')
try {
  const { add } = await import('./broken.ts')
  console.log(add(1, 2))
} catch (e) {
  console.log('import failed:', (e as Error).message)
}
