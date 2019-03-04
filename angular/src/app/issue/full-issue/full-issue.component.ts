import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {IssueService} from '../../services/issue.service';
import {Subscription} from 'rxjs';
import {IssueDetail} from '../../entities/issueDetail.model';
import {Issue} from '../../entities/issue.model';

@Component({
  selector: 'app-full-issue',
  templateUrl: './full-issue.component.html',
})
export class FullIssueComponent implements OnInit, OnDestroy {
  id : number;
  private subscription: Subscription;

  issue: Issue = null;
  details: IssueDetail = null;

  constructor( private route: ActivatedRoute,
               private issueService: IssueService) {
  }

  ngOnInit() :void {
    this.route.params.subscribe((params: Params) => this.id = +params['id']);
    this.issueService.fetchDetail(this.id);
    this.details = this.issueService.getDetail();
    this.subscription = this.issueService.detailChanged.subscribe(
      (newDetail : IssueDetail) => this.details = newDetail
    );
    this.issue = this.issueService.getSingleIssue(this.id);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
