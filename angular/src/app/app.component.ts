import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  logged: boolean = false;
  constructor(private userService : UserService){}

  ngOnInit(): void {
    this.userService.isLoggedIn()
      .then(
        (auth : boolean) => {
          this.logged = auth;
        }
      )
  }

}
