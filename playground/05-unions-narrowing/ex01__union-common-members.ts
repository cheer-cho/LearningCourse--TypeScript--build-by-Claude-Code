// Does .length exist on every member of this union?
// Run: npm run playground union-common-members
function len(x: string | number[] | Set<string>): number {
  return x.length;
}

// What does Set call its count?
const s = new Set(['a', 'b']);
console.log('size:', s.size);
console.log('length:', (s as any).length);
