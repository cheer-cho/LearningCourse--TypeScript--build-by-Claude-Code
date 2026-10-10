type Constructor<T = {}> = new (...args: any[]) => T

class Note {
  constructor(public title: string) {}
}

function Serializable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    constructor(...args: any[]) {
      super(...args)
      console.log('1. inside Serializable constructor:', JSON.stringify(this))
    }
    serialize() {
      return JSON.stringify(this)
    }
  }
}

function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    readonly createdAt = new Date()
  }
}

class Logged extends Timestamped(Serializable(Note)) {}

const n = new Logged('Groceries')
console.log('2. serialize() after new:      ', n.serialize())
