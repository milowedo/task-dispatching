import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {LoginModel} from '../entities/login.model';
import {api_address, auth_endpoint} from '../globals/globals';
import {UserService} from '../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() loginEmitter = new EventEmitter();
  private LOGIN_API = api_address + auth_endpoint;

  loginForm: FormGroup;
  private loginFailed = false;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private userService: UserService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      'key': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

  submitForm() {
    const userLogin = new LoginModel(
      this.loginForm.get('key').value.toUpperCase(),
      this.loginForm.get('password').value);
    this.logIn(userLogin);

  }

  logIn(loginModel: LoginModel) {
    this.httpClient
      .post<LoginModel>(this.LOGIN_API, loginModel)
      .subscribe(
        (data : LoginModel) => {
          this.userService.isAuthenticated = true;
          this.userService.fetchUserByUserkey(data.key);
          this.userService.userNamePromise = this.userService.getUserName();
          this.router.navigate(['/welcome']);
      },
      (error) => {
          console.log(error);
        this.setLoginFailed(true);
        this.loginForm.patchValue({password: '', key: ''});
      }
    );
  }

  setLoginFailed(val : boolean) {this.loginFailed = val;}

  getLoginFailed():boolean{ return this.loginFailed}

  goToRegisterPage() {
    this.router.navigate(['/register']);
  }
}
