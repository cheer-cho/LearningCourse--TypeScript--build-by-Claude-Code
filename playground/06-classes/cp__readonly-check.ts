// Regression guard on the REAL checkpoint: outsiders can read `shapes` but not push.
// Run: npm run playground cp__readonly-check
import { Circle, ShapeCollection } from "../../06-classes/checkpoint_06";

// Compile-time check: outsiders can read `shapes` but not change it.
// If the getter ever returns a mutable T[] again, the directive below
// stops being needed and tsc reports TS2578 (unused @ts-expect-error).

const collection = new ShapeCollection<Circle>();
collection.add(new Circle(1));

console.log("shapes.length before ->", collection.shapes.length); // ✅ reading is fine

// @ts-expect-error — outsiders must not push into shapes
collection.shapes.push(new Circle(2));

// The directive silences the compiler; it does not stop the runtime.
console.log("shapes.length after  ->", collection.shapes.length);
