// What does the REAL exercise 07 Logged serialize to? Every mixin layer's fields.
// Run: npm run playground ex07__serialize
import { Logged } from '../../06-classes/exercises/ex07'
const n = new Logged('Groceries', 'milk, eggs')
console.log('n.serialize() ->', n.serialize())
console.log('Object.keys(n) ->', Object.keys(n))
