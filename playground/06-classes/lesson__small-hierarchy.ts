// The four arrow kinds from "A small hierarchy", each in isolation.

// ── 1. extends (solid): code AND type flow down ─────────────────────
abstract class Notifier {
  sent = 0; // code: a real field
  abstract send(msg: string): void; // type: a promise subclasses must keep
  log() {
    this.sent++;
  } // code: a method inherited for free
}
class EmailNotifier extends Notifier {
  send(msg: string) {
    this.log();
    console.log('email:', msg);
  }
}
const e = new EmailNotifier();
e.send('hi');
console.log('inherited field via extends:', e.sent); // 1 — came from Notifier

// ── 2. implements (dashed): a compile-time promise, nothing flows ───
interface Printable {
  print(): string;
  // test(): string; //just to test if this is un-commented and what error will be showed
}
class Receipt implements Printable {
  // Nothing was inherited. If I delete `print`, TS errors:
  //   error TS2420: Class 'Receipt' incorrectly implements interface 'Printable'.
  print() {
    return 'receipt';
  }
}
// A class is a runtime VALUE, so `typeof` on it is legal and says "function":
console.log('typeof Notifier:', typeof Notifier);
console.log('typeof EmailNotifier:', typeof EmailNotifier);

// An interface is only a TYPE. Uncomment and run `npx tsc --noEmit` on this file:
// console.log(typeof Printable);
//   ❌ error TS2693: 'Printable' only refers to a type, but is being used as a value here.

// ── 3. "T must satisfy" (dashed): a generic constraint, not inheritance
class Registry<T extends { id: string }> {
  private items = new Map<string, T>();
  add(item: T) {
    this.items.set(item.id, item);
  }
}
new Registry<{ id: string; name: string }>().add({ id: 'a', name: 'A' });
// new Registry<{ name: string }>()  // ❌ TS2344: Type '{ name: string }' does not satisfy the constraint

// ── 4. mixin: still just `extends`, but the base was built by a function
class Article {
  title = 'untitled';
}
type Ctor<T = {}> = new (...args: any[]) => T;
function Taggable<B extends Ctor>(Base: B) {
  return class extends Base {
    tags: string[] = [];
  };
}
class Post extends Taggable(Article) {} // extends → a class a function returned
const p = new Post();
console.log('Post has both:', p.title, p.tags); // "untitled" [] — from Article AND the mixin
