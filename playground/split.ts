// Playground: how split + filter handle whitespace
// Run: npx tsx playground/split.ts

const samples = ['a b a', 'a  b', 'a\tb\nc', '  a b  ', '']

for (const s of samples) {
  console.log('input:', JSON.stringify(s))
  console.log('  split(" ")               ->', s.split(' '))
  console.log('  split(/\\s+/)             ->', s.split(/\s+/))
  console.log('  split(/\\s+/).filter(Boolean) ->', s.split(/\s+/).filter(Boolean))
  console.log()
}
