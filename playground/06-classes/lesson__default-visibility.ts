// Q: with no modifier, are `team` and `members` public / private / protected?
// A: public. No modifier === `public`. The two classes below are identical.

class Roster {
  team: string
  members: string[] = []
  constructor(team: string) {
    this.team = team
  }
}

class RosterExplicit {
  public team: string
  public members: string[] = []
  public constructor(team: string) {
    this.team = team
  }
}

const a = new Roster('Backend')
const b = new RosterExplicit('Backend')
console.log(a.team, a.members)   // ✅ readable from outside
console.log(b.team, b.members)   // ✅ same thing

// Proof they are the same type: assignable both ways.
const x: Roster = b
const y: RosterExplicit = a

// Now lock one down and watch the outside access break.
class Locked {
  private team: string
  protected members: string[] = []
  constructor(team: string) {
    this.team = team
  }
}
const l = new Locked('Backend')
// @ts-expect-error TS2341: Property 'team' is private and only accessible within class 'Locked'.
l.team
// @ts-expect-error TS2445: Property 'members' is protected and only accessible within class 'Locked' and its subclasses.
l.members

console.log('default visibility = public ✅', x === b, y === a)

export {}
