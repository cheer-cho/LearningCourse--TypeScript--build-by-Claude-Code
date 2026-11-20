// 1. Truthiness vs. undefined — the falsy trap
function rangeTruthy (start: number, end?: number): number[] {
  const out: number[] = []
  let i = 0, stop = 0
  if (end) { i = start; stop = end } else { stop = start }   // <-- falsy check
  while (i < stop) out.push(i++)
  return out
}

function rangeStrict (start: number, end?: number): number[] {
  const out: number[] = []
  let i = 0, stop = 0
  if (end !== undefined) { i = start; stop = end } else { stop = start }
  while (i < stop) out.push(i++)
  return out
}

console.log('range(2, 0) truthy:', rangeTruthy(2, 0))  // expected []
console.log('range(2, 0) strict:', rangeStrict(2, 0))

// 2. Does `| undefined` in the annotation leak into the body?
function greetA (name: string, greeting: string | undefined = 'Hello') {
  const g = greeting   //    hover: what type?
  return `${g}, ${name}!`
}
function greetB (name: string, greeting: string = 'Hello') {
  const g = greeting
  return `${g}, ${name}!`
}
console.log(greetA('Ada'), '|', greetB('Ada'))
