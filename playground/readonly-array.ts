class Playlist {
  // Private, mutable storage: only this class can push into it.
  #songs: string[] = [];

  add(song: string): void {
    this.#songs.push(song); // ✅ inside the class, it's a normal array
  }

  // Public view: same array, but typed as read-only.
  get songs(): readonly string[] {
    return this.#songs;
  }
}

const p = new Playlist();
p.add("Hey Jude");
p.add("Let It Be");

// ✅ Reading works: indexing, length, map, filter, find...
console.log(p.songs.length);           // 2
console.log(p.songs[0]);               // Hey Jude
console.log(p.songs.map((s) => s.toUpperCase()));

// ❌ Changing it doesn't compile:
// p.songs.push("Yesterday");  // error TS2339: Property 'push' does not exist on type 'readonly string[]'.
// p.songs[0] = "Yesterday";   // error TS2542: Index signature in type 'readonly string[]' only permits reading.
// p.songs = [];               // error TS2540: Cannot assign to 'songs' because it is a read-only property.

// ⚠️ Gotcha: readonly only exists at compile time. A cast gets past it:
(p.songs as string[]).push("Sneaky");
console.log(p.songs); // [ 'Hey Jude', 'Let It Be', 'Sneaky' ]
