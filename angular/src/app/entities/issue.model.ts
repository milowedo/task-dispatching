export class Issue {
  constructor( public id: number,
               public issue_key: string,
               public status: string,
               public summary: string,
               public owner: Date,
               public project : String) { }
}