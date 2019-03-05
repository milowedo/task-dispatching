export class IssueDetail {
  constructor( public id: number,
               public description: string,

               public owner: string,
               public created: Date,

               public updated : Date) { }
}
