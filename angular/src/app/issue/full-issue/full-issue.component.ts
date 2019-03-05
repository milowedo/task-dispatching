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
  private detailSubscription: Subscription;
  private issueSubscription: Subscription;

  issue: Issue = null;
  details: IssueDetail = null;
  createdInString : string = null;
  updatedInString : string = null;


  constructor( private route: ActivatedRoute,
               private issueService: IssueService) {
  }

  ngOnInit() :void {
    this.route.params.subscribe((params: Params) => this.id = +params['id']);

    this.issueService.fetchDetail(this.id);
    this.details = this.issueService.getDetail();
    this.detailSubscription = this.issueService.detailChanged.subscribe(
      (newDetail : IssueDetail) => {
        this.details = newDetail;
        let createdDate:Date = new Date(this.details.created);
        this.createdInString = this.dateToYMD(createdDate);
        let updateDate:Date = new Date(this.details.updated);
        this.updatedInString = this.dateToYMD(updateDate);
      });

    this.issueService.fetchSingleIssue(this.id);
    this.issue = this.issueService.getSingleIssue(this.id);
    this.issueSubscription = this.issueService.singleIssueSubject.subscribe(
      (newIssue : Issue) => this.issue = newIssue);

  }

  ngOnDestroy(): void {
    this.detailSubscription.unsubscribe();
    this.issueSubscription.unsubscribe();
  }

  dateToYMD(date) {
    let strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let d = date.getDate();
    let m = strArray[date.getMonth()];
    let h = date.getHours();
    let min = date.getMinutes();
    return '' + h +':' + min + " " +d + ' ' + m;
  }
}
