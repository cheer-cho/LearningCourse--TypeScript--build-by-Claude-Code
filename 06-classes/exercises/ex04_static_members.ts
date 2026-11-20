/**
 * ex04 — Static members and static blocks
 *
 * Statics live on the class itself, not on instances. A `static { }`
 * block runs exactly once — when the class is defined — and is the
 * only place (besides declarations) to set up private static state.
 *
 * TicketMachine — no instances needed, everything is static:
 * 1. `START` — public, static, readonly, type number, value 100.
 *    (readonly statics MUST be initialized at the declaration — a
 *    static block is not allowed to assign them.)
 * 2. `next` — PRIVATE static number. Initialize it to START inside a
 *    `static { }` block.
 * 3. `issue()` — static: returns the current number, then advances.
 * 4. `reset()` — static: winds `next` back to START.
 *
 *    TicketMachine.issue() // -> 100
 *    TicketMachine.issue() // -> 101
 *    TicketMachine.reset()
 *    TicketMachine.issue() // -> 100
 *
 * Check: npm test -- 06 -t ex04
 */
export class TicketMachine {
  static readonly START: number = 100;
  private static next: number;

  static {
    TicketMachine.next = TicketMachine.START;
  }

  static issue(): number {
    return TicketMachine.next++;
  }

  static reset(): void {
    TicketMachine.next = TicketMachine.START;
  }
}
