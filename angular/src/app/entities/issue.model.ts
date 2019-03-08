export class Issue {
  constructor( public id: number,
               public issue_key: string,
               public status: string,
               public priority: number,
               public summary: string,
               public assigned: string,
               public project : string) { }
}
