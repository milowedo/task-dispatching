import {Component, Inject} from '@angular/core';
import {LongPoll} from '../../../globals/LongPoll';
import {Issue} from '../../../entities/issue.model';
import {api_address} from '../../../globals/globals';

@Component({
  selector: 'app-subscribe-issue',
  templateUrl: './subscribe-issue.component.html',
  providers: [LongPoll],
})
export class SubscribeIssueComponent {
  received:Issue  = null;
  subscribing: boolean = false;
  CALL: string =  'issue/subscribe';
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
