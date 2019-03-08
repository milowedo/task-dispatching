import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {NavbarService} from '../services/navbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isCollapsed = true;


  constructor(private router: Router, public nav: NavbarService) {
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
