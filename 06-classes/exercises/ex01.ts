/**
 * ex01 — Class basics under strict initialization
 *
 * `strictPropertyInitialization` (part of `strict`) refuses any field
 * that might still be undefined after the constructor runs. A field is
 * satisfied by an initializer at the declaration OR an assignment in
 * the constructor.
 *
 * Build a Playlist class:
 * 1. `name: string` — assigned in the constructor.
 * 2. `songs: string[]` — starts as [] via a field initializer.
 * 3. `add(song)` — pushes a song, returns nothing.
 * 4. `size()` — how many songs are in the playlist.
 *
 *    const p = new Playlist('Road Trip')
 *    p.add('Take It Easy')
 *    p.size() // -> 1
 *
 * Check: npm test -- 06 -t ex01
 */

// TODO: replace the `any`s with real types and implement.
export class Playlist {
  name: any
  songs: any

  constructor(name: any) {
    throw new Error('TODO: implement the Playlist constructor')
  }

  add(song: any): any {
    throw new Error('TODO: implement add')
  }

  size(): any {
    throw new Error('TODO: implement size')
  }
}
