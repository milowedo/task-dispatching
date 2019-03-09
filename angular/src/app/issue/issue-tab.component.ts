import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../services/navbar.service';

@Component({
  selector: 'app-issue-tab',
  templateUrl: './issue-tab.component.html',
})
export class IssueTabComponent implements OnInit {

  constructor(public nav : NavbarService) { }

  ngOnInit() {
    this.nav.show()
  }

}
