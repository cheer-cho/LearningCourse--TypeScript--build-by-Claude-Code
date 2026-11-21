// Reference solution — ex01

export class Playlist {
  name: string
  songs: string[] = []

  constructor(name: string) {
    this.name = name
  }

  add(song: string): void {
    this.songs.push(song)
  }

  size(): number {
    return this.songs.length
  }
}
