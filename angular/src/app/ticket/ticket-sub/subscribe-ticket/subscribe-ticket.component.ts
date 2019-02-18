import {Component, Inject, OnInit} from '@angular/core';
import {LongPoll} from '../../../globals/LongPoll';
import {Ticket} from '../../../entities/ticket.model';
import {api_address} from '../../../globals/globals';

@Component({
  selector: 'app-subscribe-ticket',
  templateUrl: './subscribe-ticket.component.html',
  providers: [LongPoll],
})
export class SubscribeTicketComponent {
  received:Ticket  = null;
  subscribing: boolean = false;
  CALL: string =  'ticket/subscribe';
  URI:string = api_address;

  constructor(@Inject(LongPoll) private longPoll: LongPoll){
    longPoll.setUri(this.URI);
    longPoll.setCall(this.CALL);
  };

  fetch(){
    if(this.subscribing){
      this.longPoll.changeSubscriptionStatus(this.subscribing);
      this.longPoll.makeLongRequest();
      this.longPoll.dataEmitter.subscribe(
        data => this.received = data
      )
    }
  }

  removeProfile() {
    this.received = null;
  }

  subscribe() {
    this.subscribing = ! this.subscribing;
    this.longPoll.changeSubscriptionStatus(this.subscribing);
    this.fetch();
  }
}
