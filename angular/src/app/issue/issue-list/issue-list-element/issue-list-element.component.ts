import {Component, Input} from '@angular/core';
import {IssueService} from '../../../services/issue.service';
import {Issue} from '../../../entities/issue.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'issue-element',
  templateUrl: './issue-list-element.component.html',

})
export class IssueListElementComponent {

  protected isSelected: boolean = false;
  @Input() issue : Issue;
  protected id: number;

  constructor(private issueService: IssueService,
              private route: ActivatedRoute,
              private router: Router) { }

  issueSelected(){
    this.isSelected = !this.isSelected;
  }

  detailsSelected() {
    this.router.navigate(['../issue/', this.issue.id], )
  }
}
