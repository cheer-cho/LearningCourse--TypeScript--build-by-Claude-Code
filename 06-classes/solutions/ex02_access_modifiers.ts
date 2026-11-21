// Reference solution — ex02

export class BankAccount {
  readonly id: string
  protected balance = 0
  #pin: string

  constructor(id: string, pin: string) {
    this.id = id
    this.#pin = pin
  }

  deposit(amount: number): void {
    this.balance += amount
  }

  withdraw(amount: number, pin: string): boolean {
    if (pin !== this.#pin || amount > this.balance) return false
    this.balance -= amount
    return true
  }

  getBalance(): number {
    return this.balance
  }
}

export class SavingsAccount extends BankAccount {
  addInterest(rate: number): void {
    this.balance += this.balance * rate
  }
}
