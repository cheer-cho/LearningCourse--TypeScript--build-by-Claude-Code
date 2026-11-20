type Constructor<T = {}> = new (...args: any[]) => T

function Taggable<TBase extends Constructor>(Base: TBase) {
  console.log('2. Taggable runs — building the class')
  return class extends Base { tags: string[] = [] }
}

class Article { constructor(public title: string) {} }

console.log('1. before the class statement')
class Post extends Taggable(Article) {}     // ← Taggable is CALLED here
console.log('3. after the class statement — no Post created yet')

new Post('x')
console.log('4. now we made an instance (Taggable did NOT run again)')
