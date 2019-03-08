import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../entities/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-successful-login',
  templateUrl: './successful-login.component.html',
  styleUrls: ['./successful-login.component.css']
})
export class SuccessfulLoginComponent implements OnInit {
  user : User;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.user = this.userService.getLogged();
    console.log(this.user);
    const promise = new Promise((resolve => {
      setTimeout(() =>
      resolve(), 2500);
    }));
    promise.then(() => {
      this.router.navigate(['/issues']);
    });

  }

}
