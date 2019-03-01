export class IssueDetail {
  constructor( public id: number,
               public description: string,
               public priority: number,
               public assigned: string,
               public created: Date,
               public updated : Date) { }
}
