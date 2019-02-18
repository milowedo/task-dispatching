import {Component, Input} from '@angular/core';
import {TicketService} from '../services/ticket.service';
import {Ticket} from '../entities/ticket.model';

@Component({
  selector: 'app-ticket',
  templateUrl: './singleTicket.component.html',
  providers : [TicketService],
})
export class SingleTicketComponent {

  protected isSelected: boolean = false;
  @Input() ticket : Ticket;
  protected dateInString : String;

  constructor(private ticketService: TicketService) { }

  ticketSelected(){
    let temp:Date = new Date(this.ticket.timeCreated);
    this.dateInString = temp.toLocaleTimeString() +" "+ temp.toDateString();
    this.isSelected = !this.isSelected;
  }
}
