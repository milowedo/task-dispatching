import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {RegistrationModel} from '../../entities/registration.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  private registerFailed: boolean =false;

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.initializeForm()
  }

  private initializeForm(){
    let name ='';
    let surname ='';
    let password ='';
    let passwordRetyped ='';
    let email ='';


    this.registerForm = new FormGroup({
      'name' : new FormControl(name,
        Validators.compose([Validators.required,
          Validators.minLength(2)])),

      'surname' : new FormControl(surname,
        Validators.compose([Validators.required,
          Validators.minLength(2)])),

      'password' : new FormControl(password,
        Validators.compose([Validators.required,
          Validators.minLength(6)])),

      'passwordRetyped' : new FormControl(passwordRetyped,
        Validators.compose([Validators.required])),

      'email' : new FormControl(email,
        Validators.compose([Validators.required,
          Validators.email])),
    });
  }

  onSubmit(){
    const user = new RegistrationModel(
      this.registerForm.get('name').value,
      this.registerForm.get('surname').value,
      this.registerForm.get('password').value,
      this.registerForm.get('email').value
    );
    this.userService.registerUser(user);
    setTimeout(this.leaveRegister(), 100);
  }

  leaveRegister() {
    this.registerForm.reset();
  }

  setRegisterFailed(val : boolean) {this.registerFailed = val;}

}
