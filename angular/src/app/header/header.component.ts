import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isCollapsed = true;


  constructor(private router: Router) {
  }

  newIssue() {
    this.router.navigate(['/issue/new'] );
    this.isCollapsed = true;
  }

  issues() {
    this.router.navigate(['/issues/'] );
    this.isCollapsed = true;
  }
}
