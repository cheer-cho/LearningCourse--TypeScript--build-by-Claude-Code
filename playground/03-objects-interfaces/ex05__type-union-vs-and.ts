// `|` (union) vs `&` (intersection) on object types with a conflicting `kind`.
// Run: npm run playground type-union-vs-and
//   (the type-check step shows one ❌ TS2322: `Circle & Square` reduced to `never`)

type Circle = { kind: 'circle'; radius: number; };
type Square = { kind: 'square'; size: number; };

// ✅ Union: a Shape is a Circle OR a Square.
export type Shape = Circle | Square;

// ⚠️ Intersection: a Shapes must be a Circle AND a Square at once.
// `kind` would have to be 'circle' & 'square' -> never, so the whole type is never.
export type Shapes = Circle & Square;

// ❌ error TS2322: Type '{}' is not assignable to type 'never'.
//    The intersection 'Shapes' was reduced to 'never' because property 'kind'
//    has conflicting types in some constituents.
const tried: Shapes = {
  // no value can ever satisfy this — there is nothing to write here
};

// ✅ `&` works when the parts don't conflict: it just adds properties.
export type Kind = 'circle' | 'square';
export type Shape2 = {
  kind: Kind;
  area: number;
};
export type Circle2 = {
  radius: number;
} & Shape2;

const circle: Circle2 = {
  radius: 5,
  kind: 'circle',
  area: 123
};

const shapes: Shape[] = [{ kind: 'circle', radius: 1 }, { kind: 'square', size: 2 }];

console.log('union values      ->', shapes);
console.log('intersection value ->', circle);
console.log('tried (never)     ->', tried, '(runtime has no idea it is "never")');
