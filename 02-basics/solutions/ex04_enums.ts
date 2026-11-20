// Reference solution — ex04

export enum Status {
  Draft,
  Published,
  Archived,
}

export enum LogLevel {
  Debug = 'DEBUG',
  Info = 'INFO',
  Error = 'ERROR',
}

export function statusLabel(status: Status): string {
  switch (status) {
    case Status.Draft:
      return 'draft'
    case Status.Published:
      return 'published'
    case Status.Archived:
      return 'archived'
  }
}
