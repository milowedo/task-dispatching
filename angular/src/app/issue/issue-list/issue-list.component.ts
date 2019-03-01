import {Component, OnDestroy, OnInit} from '@angular/core';
import {Issue} from '../../entities/issue.model';
import {IssueService} from '../../services/issue.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-issue.component.html',
  providers: [IssueService],
})
export class IssueListComponent implements OnInit, OnDestroy{
  private subscription: Subscription;
  issues: Issue[];

  constructor(private issueService: IssueService) {}

  ngOnInit(): void {
    this.issueService.fetchAll();
    this.issues = this.issueService.getAll();
    this.subscription = this.issueService.issueChanges.subscribe(
      (newIssues : Issue[]) =>
        this.issues = newIssues
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
