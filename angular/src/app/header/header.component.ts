import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NavbarService} from '../services/navbar.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit{

  isCollapsed = true;
  username: string = '';

  ngOnInit(): void {
  }

  constructor(private router: Router, public nav: NavbarService, public userService: UserService) {
  }

  newIssue() {
    this.router.navigate(['/issue/new'] );
    this.isCollapsed = true;
  }

  issues() {
    this.router.navigate(['/issues/'] );
    this.isCollapsed = true;
  }

  getUsername() {
    if(this.username === '')
      this.username = this.userService.user.name;
    return this.username;
  }
}
