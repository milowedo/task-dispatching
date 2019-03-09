import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
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
  private detailSubscription: Subscription = null;
  private issueSubscription: Subscription = null;

   issue: Issue = null;
  details: IssueDetail = null;

  createdInString : string = null;
  updatedInString : string = null;


  constructor( private route: ActivatedRoute,
               private router: Router,
               private issueService: IssueService) {
  }

  ngOnInit() :void {
    this.route.params.subscribe((params: Params) => this.id = +params['id']);
    this.issueService.fetchDetail(this.id);
    this.details = this.issueService.getDetail();
    this.detailSubscription = this.issueService.detailChanged.subscribe(
      (newDetail : IssueDetail) => {
        this.details = newDetail;
        this.createdInString = this.dateToYMD(new Date(this.details.created));
        this.updatedInString = this.dateToYMD(new Date(this.details.updated));
      });

    this.issueService.fetchSingleIssue(this.id);
    this.issue = this.issueService.getSingleIssue(this.id);
    this.issueSubscription = this.issueService.singleIssueSubject.subscribe(
      (newIssue : Issue) => this.issue = newIssue);

  }

  ngOnDestroy(): void {
    if(this.detailSubscription) {
      console.log("chuj")
      this.detailSubscription.unsubscribe();
    }
    if(this.issueSubscription) {
      console.log("cjij")
      this.issueSubscription.unsubscribe();
    }
  }

  dateToYMD(date) {
    let strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let d = date.getDate();
    let m = strArray[date.getMonth()];
    let h = date.getHours();
    let min = date.getMinutes();
    return '' + h +':' + min + " " +d + ' ' + m;
  }

  editClicked() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }


}
