type Constructor<T = {}> = new (...args: any[]) => T

function Greetable<TBase extends Constructor<{ name: string }>>(Base: TBase) {
  return class extends Base {
    greet(): string {
      return `Hello, ${this.name}`
    }
  }
}

class User { constructor(public name: string) {} }
class Article { constructor(public title: string) {} }

// 1. The mixin returns a NEW class. Store it, then `new` it.
const GreetableUser = Greetable(User)
const ada = new GreetableUser('Ada')
console.log(ada.greet(), '| still a User?', ada instanceof User)

// 2. Mixin vs intersection: the mixin really ADDS the member at runtime.
function Taggable<TBase extends Constructor>(Base: TBase) {
  return class extends Base { tags: string[] = [] }
}
const TaggedArticle = Taggable(Article)
console.log('mixin   :', new TaggedArticle('x'))   // has tags: []
console.log('plain   :', new Article('x'))         // no tags — `&` can't change this
