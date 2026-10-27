// Why `const notifier: Notifier = new EmailNotifier()` instead of `: EmailNotifier`?
// Short answer: you don't *have* to. The annotation decides what the variable
// may hold LATER, and what callers are allowed to lean on.

abstract class Notifier {
  abstract readonly channel: string
  abstract send(to: string, msg: string): void
  broadcast(recipients: string[], msg: string): void {
    for (const r of recipients) this.send(r, msg)
  }
}

class EmailNotifier extends Notifier {
  readonly channel = 'email'
  override send(to: string, msg: string): void {
    console.log(`[email] ${to}: ${msg}`)
  }
  attach(file: string): void {            // email-only extra
    console.log(`attached ${file}`)
  }
}

class SmsNotifier extends Notifier {
  readonly channel = 'sms'
  override send(to: string, msg: string): void {
    console.log(`[sms] ${to}: ${msg}`)
  }
}

// ── 1. Swappability ──────────────────────────────────────────────
// Annotated with the base, the variable accepts ANY subclass.
let wide: Notifier = new EmailNotifier()
wide = new SmsNotifier()                    // ✅ fine
wide.broadcast(['a', 'b'], 'hi')

let narrow: EmailNotifier = new EmailNotifier()
// @ts-expect-error TS2741: Property 'attach' is missing in type 'SmsNotifier'
narrow = new SmsNotifier()

// ── 2. Callers depend only on the contract, not the concrete class ──
function notifyAll(n: Notifier, people: string[]) {
  n.broadcast(people, 'meeting at 3')
}
notifyAll(new EmailNotifier(), ['ann'])
notifyAll(new SmsNotifier(), ['bob'])

// ── 3. Information hiding: base type hides subclass-only members ──
const n: Notifier = new EmailNotifier()
// @ts-expect-error TS2339: Property 'attach' does not exist on type 'Notifier'
n.attach('report.pdf')
// Good: the rest of the program cannot secretly grow dependent on email details.

// ── 4. Inference already gives you the narrow type when you want it ──
const inferred = new EmailNotifier()        // type: EmailNotifier, no annotation needed
inferred.attach('report.pdf')               // ✅ email-specific API available

// ── 5. Narrow back on purpose, not by accident ──
if (n instanceof EmailNotifier) n.attach('ok.pdf')   // ✅ narrowed by the guard

export {}
