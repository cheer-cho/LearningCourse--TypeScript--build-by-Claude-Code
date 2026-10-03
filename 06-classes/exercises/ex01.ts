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

export class Playlist {
  name: string;
  protected songs: string[] = [];
  // we can use readonly; readonly songs: string[] = []
  // consumer can still push to it, read it, but cannot mutate it; eg reset using = []

  constructor(name: string) {
    this.name = name;
  }

  add(song: string): void {
    this.songs.push(song);
  }

  size(): number {
    return this.songs.length;
  }
}
