type Direction = 'north' | 'south' | 'east' | 'west';

// --- Version A: your version. `as Direction` is an ASSERTION.
// Watch what it lets through:
function oppositeA(dir: Direction): Direction {
  const map = {
    north: 'north' as Direction, // ❌ WRONG mapping — but compiles fine!
    south: 'north' as Direction,
    east: 'west' as Direction,
    west: 'east' as Direction,
  };
  return map[dir];
}

// --- Version B: one `as const`. No assertion of the union — the compiler
// CHECKS that every value really is a Direction when we return it.
function oppositeB(dir: Direction): Direction {
  const map = {
    north: 'south',
    south: 'north',
    east: 'west',
    west: 'east',
  } as const;
  return map[dir];
}

// Proof that B is checked: uncomment the next block and it will NOT compile.
// function oppositeBad(dir: Direction): Direction {
//   const map = { north: 'up', south: 'north', east: 'west', west: 'east' } as const;
//   return map[dir]; // error: 'up' is not assignable to Direction
// }

console.log('A says opposite of north is:', oppositeA('north')); // 'north' — bug shipped silently
console.log('B says opposite of north is:', oppositeB('north')); // 'south'
