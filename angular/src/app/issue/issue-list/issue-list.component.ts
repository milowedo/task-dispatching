import {Component, OnDestroy, OnInit} from '@angular/core';
import {Issue} from '../../entities/issue.model';
import {IssueService} from '../../services/issue.service';
import {Subscription} from 'rxjs';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ChildActivationEnd, NavigationEnd, Router} from '@angular/router';
import {UserService} from '../../services/user.service';

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

  constructor(private issueService: IssueService,
              private router: Router,
              private userService: UserService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof ChildActivationEnd || e instanceof NavigationEnd) {
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
    if(this.subscription)
      this.subscription.unsubscribe();
    this.lookForChanges(this.todos, 'to do');
    this.lookForChanges(this.progresses, 'in progress');
    this.lookForChanges(this.reviews, 'code review');
    this.lookForChanges(this.dones, 'done');
  }

  lookForChanges(lane:Issue[], type){
    lane.forEach((el) => {
      if(el.status !== type){
        el.status = type;
        this.issueService.saveIssue(el);
      }
    });
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

  drop(event: CdkDragDrop<string[]>, arrayDroppedIn?: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data,
        event.previousIndex, event.currentIndex);
    }
    if(arrayDroppedIn == 'todos'){
      event.container.data[event.currentIndex]['assigned'] = '';
    }else if(event.container.data[event.currentIndex]['assigned'] == '') {
      event.container.data[event.currentIndex]['assigned'] = this.userService.user.key;
    }
  }

}
