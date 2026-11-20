function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

type Shape = { kind: 'circle'; r: number } | { kind: 'square'; side: number };

function area(shape: Shape, maybeName: string | null): string {
  // Before: maybeName is  string | null
  assert(maybeName !== null, 'name required');
  // After:  maybeName is  string   (TS read the `!== null` inside the condition)
  const upper = maybeName.toUpperCase(); // no error, no cast, no `!`

  // Before: shape is the whole union
  assert(shape.kind === 'circle', 'circles only');
  // After:  shape is { kind: 'circle'; r: number }
  return `${upper}: ${Math.PI * shape.r ** 2}`; // shape.r is allowed now
}

console.log(area({ kind: 'circle', r: 1 }, 'unit'));
try {
  area({ kind: 'square', side: 2 }, 'box');
} catch (e) {
  console.log('threw:', (e as Error).message);
}

// The same tool, written as `if`, for comparison:
function areaWithIf(shape: Shape, maybeName: string | null): string {
  if (maybeName === null) throw new Error('name required');
  if (shape.kind !== 'circle') throw new Error('circles only');
  return `${maybeName.toUpperCase()}: ${Math.PI * shape.r ** 2}`;
}
console.log(areaWithIf({ kind: 'circle', r: 2 }, 'big'));
