import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ticket} from '../../entities/ticket.model';
import {TicketService} from '../../services/ticket.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  providers: [TicketService],
})
export class TicketListComponent implements OnInit, OnDestroy{
  private subscription: Subscription;
  tickets: Ticket[];

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketService.fetchAllTickets();
    this.tickets = this.ticketService.getTickets();
    this.subscription = this.ticketService.ticketsChanged.subscribe(
      (newTickets : Ticket[]) =>
        this.tickets = newTickets
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
