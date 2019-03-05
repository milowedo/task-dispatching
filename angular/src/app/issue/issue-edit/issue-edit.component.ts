import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css'],
})
export class IssueEditComponent implements OnInit {
  issueForm : FormGroup;
  id: number = -1;
  isThisEditMode: boolean = false;
  loggedUserName : string = 'John';
  progressKEY: number = 0;
  progressPRIORITY: number = 0;
  progressTEAM: number = 0;
  progressDESCLONG: number = 0;
  progressDESCSHORT: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (param : Params) => {
          this.id = +param['id'];
          this.isThisEditMode = (this.id > 0);
          this.initializeForm();
        }
      );
  }

  private initializeForm(){
    let key = '';
    let priority = '';
    let project = '';
    let description = '';
    let summary = '';
    this.issueForm = new FormGroup({
      'key' : new FormControl(key, Validators.required),
      'priority' : new FormControl(priority),
      'project' : new FormControl(project),
      'description' : new FormControl(description),
      'summary' : new FormControl(summary),
    })
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
}
