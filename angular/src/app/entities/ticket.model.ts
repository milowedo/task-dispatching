export class Ticket {
  constructor( public ticketID: number,
               public ticketStatus: string,
               public descriptionGist: string,
               public timeCreated: Date) {
    this.timeCreated = new Date(timeCreated);
  }
}
