const values: [string, unknown][] = [
  ['undefined', undefined], ['null', null], ['0', 0], ["''", ''],
  ['false', false], ['NaN', NaN], ['[]', []], ['{}', {}], ["'hi'", 'hi'],
]

console.log('value      | truthy? | x || "F" | x ?? "F"')
console.log('-----------|---------|----------|---------')
for (const [label, v] of values) {
  const truthy = v ? 'yes' : 'NO '
  const or  = String((v as any) || 'F')
  const nul = String((v as any) ?? 'F')
  console.log(`${label.padEnd(10)} |   ${truthy}   | ${or.padEnd(8)} | ${nul}`)
}
