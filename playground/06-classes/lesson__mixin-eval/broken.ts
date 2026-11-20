// A module whose mixin throws at load time. Not meant to be run directly:
// it is imported by consumer.ts.
// Run: npm run playground playground/06-classes/lesson__mixin-eval/consumer.ts

type Constructor<T = {}> = new (...args: any[]) => T

function Taggable<TBase extends Constructor>(Base: TBase) {
  throw new Error('mixin blew up')
  return class extends Base {}
}

class Article { constructor(public title: string) {} }

export class Post extends Taggable(Article) {}   // runs on import!
export const add = (a: number, b: number) => a + b  // innocent, but unreachable
