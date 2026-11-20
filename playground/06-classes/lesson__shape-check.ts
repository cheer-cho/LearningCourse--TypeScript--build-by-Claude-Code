interface Printable { print(): string }

// The shape check: "does this have print(): string?"  Origin is ignored.

class Receipt implements Printable {      // 1. a class that promised
  print() { return "receipt" }
}
class Ticket {                            // 2. a class that never mentioned Printable
  print() { return "ticket" }
}
const note = { print: () => "note" }      // 3. a plain object literal
function show(p: Printable) { console.log(p.print()) }

show(new Receipt())   // ✅ has print
show(new Ticket())    // ✅ has print — never said implements, still passes
show(note)            // ✅ has print — not even a class

// Fails only when the SHAPE is wrong:
class Broken implements Printable {
  print() { return 42 }   // ❌ TS2416: Property 'print' ... Type 'number' is not assignable to type 'string'
}
