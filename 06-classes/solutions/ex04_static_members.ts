// Reference solution — ex04

export class TicketMachine {
  static readonly START: number = 100
  private static next: number

  static {
    TicketMachine.next = TicketMachine.START
  }

  static issue(): number {
    return TicketMachine.next++
  }

  static reset(): void {
    TicketMachine.next = TicketMachine.START
  }
}
