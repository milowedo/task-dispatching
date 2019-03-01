import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-full-issue',
  templateUrl: './full-issue.component.html',
})
export class FullIssueComponent implements OnInit {
  id : number;
  constructor( private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
        }
      )
  }

}
