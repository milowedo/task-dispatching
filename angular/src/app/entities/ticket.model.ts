export class Ticket {
  constructor( public ticketID: number,
               public ticketStatus: string,
               public descriptionGist: string,
               public timeCreated: Date,
               public ticketType : String) {
    this.timeCreated = new Date(timeCreated);
  }
}
