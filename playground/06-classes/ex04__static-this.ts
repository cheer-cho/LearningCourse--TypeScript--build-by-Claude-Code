// Detaching a static method: safe if it names the class, a crash if it uses `this`.
// Run: npm run playground ex04__static-this
import { TicketMachine } from '../../06-classes/exercises/ex04'

// Your ex04: issue() says `TicketMachine.next++`, so it never reads `this`.
const issue = TicketMachine.issue // detached — `this` is lost...
try {
  console.log('detached TicketMachine.issue() ->', issue()) // ...but nothing needed it
} catch (e) {
  console.log('detached TicketMachine.issue() -> 💥', (e as Error).message)
}

// Contrast: the same method written with `this.next++`.
class ThisMachine {
  static next = 100
  static issue() { return this.next++ }
}
const issueThis = ThisMachine.issue
try {
  console.log('detached ThisMachine.issue()   ->', issueThis())
} catch (e) {
  console.log('detached ThisMachine.issue()   -> 💥', (e as Error).message)
}
