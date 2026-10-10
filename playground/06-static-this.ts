import { TicketMachine } from '../06-classes/exercises/ex04'

const issue = TicketMachine.issue // detached — `this` is lost
try {
  console.log(issue())
} catch (e) {
  console.log('💥', (e as Error).message)
}
