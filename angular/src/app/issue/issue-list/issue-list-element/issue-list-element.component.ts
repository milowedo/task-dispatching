import {Component, Input} from '@angular/core';
import {IssueService} from '../../../services/issue.service';
import {Issue} from '../../../entities/issue.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'issue-element',
  templateUrl: './issue-list-element.component.html',
  providers : [IssueService],
})
export class IssueListElementComponent {

  protected isSelected: boolean = false;
  @Input() issue : Issue;
  protected id: number;
  protected dateInString : String;

  constructor(private issueService: IssueService,
              private route: ActivatedRoute,
              private router: Router) { }

  issueSelected(){
    //let temp:Date = new Date(this.issue.timeCreated);
    //this.dateInString = temp.toLocaleTimeString() +" "+ temp.toDateString();
    this.isSelected = !this.isSelected;
  }

  detailsSelected() {
    this.router.navigate([this.issue.id], {relativeTo: this.route})
  }
}
