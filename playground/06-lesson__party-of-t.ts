// "class Party of T" = a GENERIC class: Party<T>
// "T must satisfy Combatant" = a CONSTRAINT: Party<T extends Combatant>

interface Combatant {
  name: string;
  attack(): number;
}

class Warrior implements Combatant {
  constructor(public name: string) {}
  attack() {
    return 10;
  }
}

class Mage implements Combatant {
  constructor(public name: string) {}
  attack() {
    return 7;
  }
}

// T is a placeholder for "whatever kind of member this party holds".
// `extends Combatant` is the rule: T may be ANY type, as long as it has
// a `name` and an `attack()`. That is what "T must satisfy" means.
class Party<T extends Combatant> {
  private members: T[] = [];

  add(member: T) {
    this.members.push(member);
  }

  // Because T satisfies Combatant, we KNOW every member can attack().
  totalDamage() {
    return this.members.reduce((sum, m) => sum + m.attack(), 0);
  }

  // ...but T can still be more specific than Combatant:
  first(): T | undefined {
    return this.members[0];
  }
}

const warriors = new Party<Warrior>();
warriors.add(new Warrior('Conan'));
warriors.add(new Warrior('Xena'));
console.log('warriors:', warriors.totalDamage()); // 20

const mixed = new Party<Combatant>(); // any Combatant is welcome
mixed.add(new Warrior('Conan'));
mixed.add(new Mage('Merlin'));
console.log('mixed:', mixed.totalDamage()); // 17

// T does NOT satisfy Combatant here -> compile error, uncomment to see:
// const nope = new Party<string>()
// const nope2 = new Party<{ name: string }>()   // has name, but no attack()
