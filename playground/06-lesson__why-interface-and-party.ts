// THE STORY: a tiny RPG. Four different "relationship" tools, each with a job.

// 1. INTERFACE = the minimum promise "this thing can fight".
//    No code. Just a shape.
interface Combatant {
  name: string;
  attack(): number;
}

// 2. ABSTRACT CLASS = shared CODE for humanoid characters (hp, takeDamage).
//    `implements Combatant` = "I promise every Character can fight".
abstract class Character implements Combatant {
  hp = 100;
  constructor(public name: string) {}
  takeDamage(n: number) {
    this.hp -= n;
  } // real code, inherited
  abstract attack(): number; // promise passed to subclasses
}

// 3. EXTENDS = inherit that code, fill in the promise.
class Warrior extends Character {
  attack() {
    return 10;
  }
}
class Mage extends Character {
  attack() {
    return 7;
  }
}

// Something that FIGHTS but is NOT a Character: no hp, no takeDamage,
// not even a class. This is why the interface exists separately.
const turret: Combatant = { name: 'Turret', attack: () => 5 };

// 4. GENERIC + CONSTRAINT = a container. It does NOT fight itself.
//    It only demands that its members can.
class Party<T extends Combatant> {
  private members: T[] = [];
  add(m: T) {
    this.members.push(m);
    return this;
  }
  totalDamage() {
    return this.members.reduce((s, m) => s + m.attack(), 0);
  }
}

const raid = new Party<Combatant>()
  .add(new Warrior('Conan'))
  .add(new Mage('Merlin'))
  .add(turret); // ✅ allowed: it satisfies Combatant
console.log('raid damage:', raid.totalDamage()); // 22

// --- Now the "what if" that answers your question ------------------------

// What if Party demanded Character instead of the interface?
class StrictParty<T extends Character> {
  private members: T[] = [];
  add(m: T) {
    this.members.push(m);
  }
}
const strict = new StrictParty<Character>();
strict.add(new Warrior('Conan'));
// @ts-expect-error  turret has no hp / takeDamage -> rejected
strict.add(turret);

// What if we deleted Character and kept only the interface?
// Then Warrior and Mage would each have to copy hp + takeDamage. Duplication.

console.log('ok');

export {};
