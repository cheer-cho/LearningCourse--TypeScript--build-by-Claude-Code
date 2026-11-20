// Reference solution — ex07

export type Constructor<T = {}> = new (...args: any[]) => T

export function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    createdAt = new Date()
  }
}

export function Serializable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    serialize(): string {
      return JSON.stringify(this)
    }
  }
}

export class Note {
  constructor(
    public title: string,
    public body: string,
  ) {}
}
