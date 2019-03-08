import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {LoginModel} from '../entities/login.model';
import {api_address, auth_endpoint} from '../globals/globals';
import {TokenService} from '../authorization/token.service';
import {JwtResponse} from '../authorization/jwt';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() loginEmitter = new EventEmitter();

  loginForm: FormGroup;
  loginFailed = false;

  constructor(private http: HttpClient, private router: Router,
              private tokenService: TokenService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      'userkey': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }



}
