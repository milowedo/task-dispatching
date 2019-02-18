import {Component, Input} from '@angular/core';
import {TicketService} from '../services/ticket.service';
import {Ticket} from '../entities/ticket.model';

@Component({
  selector: 'app-ticket',
  templateUrl: './singleTicket.component.html',
  providers : [TicketService],
})
export class SingleTicketComponent {

  @Input() ticket : Ticket;

  constructor(private ticketService: TicketService) { }

  ticketClicked(){
    this.ticket.timeCreated = new Date(this.ticket.timeCreated);
    this.ticketService.ticketClicked.emit(this.ticket);
  }
}
