import {Component, OnDestroy, OnInit} from '@angular/core';
import {Issue} from '../../entities/issue.model';
import {IssueService} from '../../services/issue.service';
import {Subscription} from 'rxjs';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],
})
export class IssueListComponent implements OnInit, OnDestroy{
  private subscription: Subscription = null;
  private navigationSubscription;
  issues: Issue[];
  todos: Issue[];
  progresses: Issue[];
  reviews: Issue[];
  dones: Issue[];

  constructor(private issueService: IssueService, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialize();
      }
    });
  }

  ngOnInit(): void {
    this.initialize();
  }
  private initialize() {
    this.issueService.fetchAllIssues();
    this.issues = this.issueService.getIssues();
    if(this.issues.length > 0)
      this.segregateIssues(this.issues);

    this.subscription = this.issueService.issuesChanged.subscribe(
      (newIssues : Issue[]) => {
        this.issues = newIssues;
        this.segregateIssues(newIssues);
      });
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  segregateIssues(toBeSegregatedIssues : Issue[]){
    this.todos = this.filter(toBeSegregatedIssues, 'to do');
    this.progresses = this.filter(toBeSegregatedIssues, 'in progress');
    this.reviews = this.filter(toBeSegregatedIssues, 'code review');
    this.dones = this.filter(toBeSegregatedIssues, 'done');
  }

  filter(issues: Issue[], todo: string) :Issue[]{
    return issues.filter( issue => issue.status === todo);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
