import {Component, OnDestroy, OnInit} from '@angular/core';
import {Issue} from '../../entities/issue.model';
import {IssueService} from '../../services/issue.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html'
})
export class IssueListComponent implements OnInit, OnDestroy{
  private subscription: Subscription = null;
  issues: Issue[];

  constructor(private issueService: IssueService) {}

  ngOnInit(): void {
    this.issueService.fetchAllIssues();
    this.issues = this.issueService.getIssues();
    this.subscription = this.issueService.issuesChanged.subscribe(
      (newIssues : Issue[]) =>
        this.issues = newIssues
    )
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  filter(issues: Issue[], todo: string) :Issue[]{
    return issues.filter( issue => issue.status === todo);
  }
}
