/**
 * ex02 — public / protected / private / #private / readonly
 *
 * Two flavours of privacy: TS `private` is erased at compile time (the
 * property is still there at runtime!), while JS `#fields` are enforced
 * by the engine itself. The tests check BOTH stories.
 *
 * BankAccount:
 * 1. `id` — public and `readonly` (assigned once, in the constructor).
 * 2. `balance` — `protected`, starts at 0 (subclasses may use it,
 *    outsiders must not see it in the type).
 * 3. `#pin` — a true JS private field holding the pin string.
 *    (Delete the placeholder `pin` field.)
 * 4. `deposit(amount)` — adds to the balance, returns nothing.
 * 5. `withdraw(amount, pin)` — only succeeds when the pin matches AND
 *    the balance covers it; returns true/false accordingly.
 * 6. `getBalance()` — the current balance.
 *
 * SavingsAccount extends BankAccount:
 * 7. `addInterest(rate)` — balance grows by balance * rate (this is
 *    where `protected` earns its keep), returns nothing.
 *
 *    const a = new BankAccount('acc-1', '1234')
 *    a.deposit(100)
 *    a.withdraw(30, '1234') // -> true,  balance 70
 *    a.withdraw(30, '9999') // -> false, balance 70
 *
 * Check: npm test -- 06 -t ex02
 */
export class BankAccount {
  readonly id: string;
  protected balance = 0;
  #pin: string;

  constructor(id: string, pin: string) {
    this.id = id;
    this.#pin = pin;
  }

  deposit(amount: number): void {
    if (!(amount > 0)) {
      return;
    }
    this.balance += amount;
  }

  withdraw(amount: number, pin: string): boolean {
    if (pin !== this.#pin) {
      return false;
    }

    if (!(amount >= 0)) {
      return false;
    }

    if (this.balance < amount) {
      return false;
    }

    this.balance -= amount;
    return true;
  }

  getBalance(): number {
    return this.balance;
  }
}

export class SavingsAccount extends BankAccount {
  addInterest(rate: number): void {
    this.balance += this.balance * rate;
  }
}
