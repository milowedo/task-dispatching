import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {NavbarService} from '../../services/navbar.service';

@Component({
  selector: 'app-successful-login',
  templateUrl: './successful-login.component.html',
  styleUrls: ['./successful-login.component.css']
})
export class SuccessfulLoginComponent implements OnInit {

  constructor(public userService: UserService,
              private router: Router,
              public nav : NavbarService) { }

  ngOnInit() {
    this.nav.show();
    const promise = new Promise((resolve => {
      setTimeout(() =>
      resolve(), 1500);
    }));
    promise.then(() => {
      this.router.navigate(['/issues']);
    });

  }

}
