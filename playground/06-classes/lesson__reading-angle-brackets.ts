// ── How to READ `class Registry<T extends { id: string }>` without Module 07 ──
//
// Think of `<T>` as a PARAMETER for a TYPE, exactly like `(x)` is a parameter
// for a value. The class is a blueprint with a blank in it. `new Registry<...>`
// fills the blank. You already do this every day:
const names: Array<string> = ['a']; // Array is a blueprint, string fills the blank
const lookup = new Map<string, number>(); // Map has TWO blanks

/**
 * 
 * const lookup = {
 *  "a": 0-9,
 *  "b": 0-9,
 *  etc
 * }
 * 
 */

// ── Step 1: a class with NO blank. Works, but only for one shape. ──
class UserRegistry {
  private items = new Map<string, { id: string; name: string }>();
  add(item: { id: string; name: string }) {
    this.items.set(item.id, item);
  }
}

// ── Step 2: same class, but the item shape is a blank called T. ──
//    The "for whatever T" is written once, right after the class name.
class Registry<T> {
  private items = new Map<string, T>(); // T used here...
  add(item: T) {
    // ...and here. Same T.
    // this.items.set(item.id, item);
    //   ❌ TS2339: Property 'id' does not exist on type 'T'.
    //   TypeScript knows nothing about T yet. It could be a number!
  }
}

// ── Step 3: `extends` here means "T must AT LEAST have this shape". ──
//    It is a constraint on the blank, not inheritance between classes.
class SafeRegistry<T extends { id: string }> {
  private items = new Map<string, T>();
  add(item: T) {
    this.items.set(item.id, item); // ✅ every T has an `id: string`
  }
  get(id: string): T | undefined {
    return this.items.get(id);
  }
}

// Fill the blank. T = { id: string; name: string } for THIS instance.
const users = new SafeRegistry<{ id: string; name: string }>();
users.add({ id: 'u1', name: 'Ada' });
console.log(users.get('u1')?.name); // "Ada", and TS knows .name exists

// Fill the blank differently. T = { id: string; price: number } here.
const products = new SafeRegistry<{ id: string; price: number }>();
products.add({ id: 'p1', price: 9 });
console.log(products.get('p1')?.price); // 9

// new SafeRegistry<{ name: string }>();
//   ❌ TS2344: Type '{ name: string; }' does not satisfy the constraint '{ id: string; }'.

// ── Step 4: the "shape" is just a normal type. Name it, then fill the blank. ──
//    `{ id: string; name: string }` above is an INLINE object type (Module 03).
//    Most real code gives that shape a name first. Nothing else changes.
interface UserT {
  id: string;
  name: string;
}

interface Product {
  id: string;
  price: number;
}

// Same as Step 3, but the blank is filled with a NAME instead of a literal.
const userRegistry = new SafeRegistry<UserT>();          // T = User
userRegistry.add({ id: 'u2', name: 'Grace' });
console.log(userRegistry.get('u2')?.name);              // "Grace"

const productRegistry = new SafeRegistry<Product>();    // T = Product
productRegistry.add({ id: 'p2', price: 42 });
console.log(productRegistry.get('p2')?.price);          // 42

// The constraint checks the SHAPE, not the name. User has an `id: string`,
// so it "satisfies" { id: string } even though it never mentions that type.
// This is structural typing from Module 03, applied to the blank.

// ── Step 5: shapes that do NOT fit the blank ──
interface Tag {
  label: string;                                          // no id at all
}
interface NumericUser {
  id: number;                                             // id, but wrong type
  name: string;
}

// new SafeRegistry<Tag>();
//   ❌ TS2344: Type 'Tag' does not satisfy the constraint '{ id: string; }'.
//        Property 'id' is missing in type 'Tag' but required in type '{ id: string; }'.

// new SafeRegistry<NumericUser>();
//   ❌ TS2344: Type 'NumericUser' does not satisfy the constraint '{ id: string; }'.
//        Types of property 'id' are incompatible. Type 'number' is not assignable to type 'string'.

// ── Step 6: you can even let TypeScript fill the blank for you ──
//    If the constructor takes a T, TS infers T from the argument. No <...> needed.
class Single<T extends { id: string }> {
  constructor(public item: T) {}
}
const one = new Single({ id: 'x', name: 'inferred' });   // T = { id: string; name: string }
console.log(one.item.name);                               // TS knows .name exists
