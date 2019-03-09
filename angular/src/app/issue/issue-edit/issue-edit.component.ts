import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {IssueService} from '../../services/issue.service';
import {Subscription} from 'rxjs';
import {IssueDetail} from '../../entities/issueDetail.model';
import {Issue} from '../../entities/issue.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css'],
})
export class IssueEditComponent implements OnInit, OnDestroy {
  issueForm : FormGroup;
  id: number = -1;
  isThisEditMode: boolean = false;
  loggedUserName : string = 'Maya';
  private detailSubscription : Subscription = null;
  private issueSubscription : Subscription = null;
  private issue :Issue;
  private detail :IssueDetail;

  inputProgressFields : number[] = [0,0,0,0,0];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private issueService: IssueService,
              private userService: UserService) {}

  ngOnInit() {
    this.loggedUserName = this.userService.user.name;
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
      'key' : new FormControl(key,
        Validators.compose([Validators.required,
          Validators.pattern(/^[a-zA-Z]{1,3}-[1-9]{1,2}$/)])),

      'priority' : new FormControl(priority,
        Validators.compose([Validators.required,
          Validators.min(1),
          Validators.max(9)])),

      'project' : new FormControl(project,
        Validators.compose([Validators.required,
          Validators.minLength(5)])),

      'description' : new FormControl(description,
        Validators.compose([Validators.required,
          Validators.minLength(50),])),

      'summary' : new FormControl(summary,
        Validators.compose([Validators.required,
          Validators.minLength(20)])),
    });

    if(this.isThisEditMode){
      this.issueService.fetchSingleIssue(this.id);
      this.issue = this.issueService.getSingleIssue(this.id);
      this.issueSubscription = this.issueService.singleIssueSubject.subscribe(
        (res : Issue) => {
          this.issue = res;
          this.issueForm.patchValue({
            key : res.issue_key,
            priority : res.priority,
            project :res.project,
            summary : res.summary});
        });
      this.issueService.fetchDetail(this.id);
      this.detail = this.issueService.getDetail();
      this.detailSubscription = this.issueService.detailChanged.subscribe(
        (res : IssueDetail) => {
          this.detail = res;
          this.issueForm.patchValue({description: res.description});
        });
    }
  }


  onSubmit() {
    let createdTime;
    let issueID = 0;
    let assigned = '';
    let status = 'to do';
    let owner = this.loggedUserName;
    if(this.isThisEditMode) {
      createdTime = this.detail.created;
      issueID = this.issue.id;
      assigned = this.issue.assigned;
      status = this.issue.status;
      owner = this.detail.owner;
    }else{
      createdTime = new Date();
    }

    const issue = new Issue(
      issueID,
      this.issueForm.get('key').value,
      status,
      this.issueForm.get('priority').value,
      this.issueForm.get('summary').value,
      assigned,
      this.issueForm.get('project').value,
      );

    const detail = new IssueDetail(
      issueID,
      this.issueForm.get('description').value,
      owner,
      createdTime,//created
      new Date(),//updated
      );
    this.issueService.saveFullIssue(issue, detail);
    this.leaveEdit();
  }

  leaveEdit() {
    this.issueForm.reset();
    if(this.isThisEditMode) {
      this.router.navigate(['/issues']);
    }else{
      this.router.navigate(['/issues']);
    }
  }

  ngOnDestroy(): void {
    if(this.detailSubscription) {
      this.detailSubscription.unsubscribe();
    }
    if(this.issueSubscription) {
      this.issueSubscription.unsubscribe();
    }
  }

  getProgress() {
    const width =  this.inputProgressFields.reduce(
      function (a, b) {
        return a + b
      });
    return width + '%';
  }

  setProgress(value : string, index :number) {
    console.log("setting");
    if(this.issueForm.get(value).valid){
      this.inputProgressFields[index] = 20;
    }else {
      this.inputProgressFields[index] = 0;
    }
  }
}
