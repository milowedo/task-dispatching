import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import {IssueService} from '../../services/issue.service';
import {Subscription} from 'rxjs';
import {IssueDetail} from '../../entities/issueDetail.model';
import {Issue} from '../../entities/issue.model';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css'],
})
export class IssueEditComponent implements OnInit, OnDestroy {
  issueForm : FormGroup;
  id: number = -1;
  isThisEditMode: boolean = false;
  loggedUserName : string = 'John';
  private detailSubscription : Subscription = null;
  private issueSubscription : Subscription = null;


  progressKEY: number = 0;
  progressPRIORITY: number = 0;
  progressTEAM: number = 0;
  progressDESCLONG: number = 0;
  progressDESCSHORT: number = 0;

  constructor(private route: ActivatedRoute, private issueService: IssueService) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (param : Params) => {
          this.id = +param['id'];
          this.isThisEditMode = (param['id'] != null);
          this.initializeForm();
        }
      );
  }

  private initializeForm(){
    let key = '';
    let priority = 0;
    let project = '';
    let description = '';
    let summary = '';


    this.issueForm = new FormGroup({
      'key' : new FormControl(key, Validators.required),
      'priority' : new FormControl(priority),
      'project' : new FormControl(project),
      'description' : new FormControl(description),
      'summary' : new FormControl(summary),
    });

    if(this.isThisEditMode){
      this.issueService.fetchSingleIssue(this.id);
      let issue = this.issueService.getSingleIssue(this.id);
      this.issueSubscription = this.issueService.singleIssueSubject.subscribe(
        (res : Issue) => {
          this.issueForm.patchValue({
            key : res.issue_key,
            priority : res.priority,
            project :res.project,
            summary : res.summary});
        });


      this.issueService.fetchDetail(this.id);
      let detail = this.issueService.getDetail();
      this.detailSubscription = this.issueService.detailChanged.subscribe(
        (res : IssueDetail) => {
          detail = res;
          this.issueForm.patchValue({description: res.description});
        });
    }
  }

  onSubmit() {

  }

  leaveEdit() {
  }

  getProgress() {
    return this.progressKEY
      +this.progressPRIORITY
      +this.progressTEAM
      +this.progressDESCSHORT
      +this.progressDESCLONG
      +'%';
  }

  ngOnDestroy(): void {
    if(this.detailSubscription) {
      this.detailSubscription.unsubscribe();
    }
    if(this.issueSubscription) {
      this.issueSubscription.unsubscribe();
    }
  }


}
