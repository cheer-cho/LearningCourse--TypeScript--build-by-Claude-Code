// A tuple: fixed length, one type per position.
// The labels (red:, green:, blue:) are documentation only —
// they show up in editor hints but don't exist at runtime.
type Rgb = [red: number, green: number, blue: number]

function brightness(color: [red: number, green: number, blue: number]): number {
  // Two ways to get values out of a tuple:

  // 1. By index — TypeScript knows color[0] is a number
  const r = color[0]

  // 2. By destructuring — usually nicer to read
  const [, g, b] = color

  return (r + g + b) / 3
}

const tomato: Rgb = [255, 99, 71]
console.log('brightness:', brightness(tomato))

// The type system enforces the shape:
// const bad: Rgb = [255, 99]        // error: needs 3 elements
// const alsoBad: Rgb = [255, 99, 'x'] // error: 3rd must be number
