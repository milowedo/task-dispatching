import {Component, Input} from '@angular/core';
import {TicketService} from '../../../services/ticket.service';
import {Ticket} from '../../../entities/ticket.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket-list-element.component.html',
  providers : [TicketService],
})
export class TicketListElementComponent {

  protected isSelected: boolean = false;
  @Input() ticket : Ticket;
  protected dateInString : String;

  constructor(private ticketService: TicketService,
              private route: ActivatedRoute,
              private router: Router) { }

  ticketSelected(){
    let temp:Date = new Date(this.ticket.timeCreated);
    this.dateInString = temp.toLocaleTimeString() +" "+ temp.toDateString();
    this.isSelected = !this.isSelected;
  }

  detailsSelected() {
    this.router.navigate([this.ticket.ticketID], {relativeTo: this.route})
  }
}
