import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NavbarService} from '../services/navbar.service';
import {UserService} from '../services/user.service';
import {Issue} from '../entities/issue.model';
import {LongPoll} from '../globals/LongPoll';
import {api_address} from '../globals/globals';
import {IssueService} from '../services/issue.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [LongPoll],
})
export class HeaderComponent implements OnInit{

  isCollapsed = true;
  issue : Issue;
  CALL: string =  'issue/subscribe';
  URI:string = api_address;

  constructor(@Inject(LongPoll) private longPoll : LongPoll,
              private router: Router,
              public nav: NavbarService,
              public userService: UserService,
              public issueService: IssueService) {
    longPoll.setUri(this.URI);
    longPoll.setCall(this.CALL);
  }

  ngOnInit(): void {
    this.longPoll.changeSubscriptionStatus(true);
    this.fetch();
  }

  fetch(){
      this.longPoll.makeLongRequest();
      this.longPoll.dataEmitter.subscribe(data => {
          this.issue = data;
          this.issueService.addIssue(data);
          new Promise(() => {
            setTimeout(() => this.issue = null, 10000)
          });
        }
      )
  }

  //navigation routes
  newIssue() {
    this.router.navigate(['/issue/new'] );
    this.isCollapsed = true;
  }
  issues() {
    if(this.router.url == '/issues') {
      this.router.navigate(['/issues', { queryParams: { 'refresh': 1 }} ]);
    }
    this.router.navigate(['/issues'] );
    this.isCollapsed = true;
  }

}
