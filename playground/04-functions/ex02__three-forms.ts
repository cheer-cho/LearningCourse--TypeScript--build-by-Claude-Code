// A) optional        — may omit
function a (name: string, greeting?: string) {}

// B) default         — may omit
function b (name: string, greeting: string = 'Hi') {}

// C) required, but the type allows undefined — MUST pass something
function c (name: string, greeting: string | undefined) {}

a('Ada')             // ok
b('Ada')             // ok
// @ts-expect-error   C is required — omitting it is an error
c('Ada')
c('Ada', undefined)  // ok: you satisfied "must pass", with undefined

a('Ada', undefined)  // ok
b('Ada', undefined)  // ok

// Does a default fire on an explicit undefined? Count the real arguments:
function greet (name: string, greeting = 'Hello') {
  console.log(`args passed: ${arguments.length} -> "${greeting}, ${name}!"`)
}
greet('Ada')
greet('Ada', undefined)
greet('Ada', 'Yo')
