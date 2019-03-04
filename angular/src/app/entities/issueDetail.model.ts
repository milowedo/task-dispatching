export class IssueDetail {
  constructor( public id: number,
               public description: string,
               public assigned: string,
               public created: Date,
               public updated : Date) { }
}
