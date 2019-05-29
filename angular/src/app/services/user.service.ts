import {User} from '../entities/user.model';
import {HttpClient} from '@angular/common/http';
import {api_address, register_endpoint, user_endpoint, userByKey_endpoint} from '../globals/globals';
import {Injectable} from '@angular/core';
import {RegistrationModel} from '../entities/registration.model';
import {LoginModel} from '../entities/login.model';
import {Router} from '@angular/router';

@Injectable()
export class UserService {
  isAuthenticated = false;
  user: User;
  userNamePromise;
  private REGISTER_API = api_address + user_endpoint + register_endpoint;


  constructor(private httpClient : HttpClient, private router: Router){}

  checkAuthenticated () {
    return new Promise(
      resolve => resolve(this.isAuthenticated));
  }

  fetchUserByUserkey(userkey : string) {
    let address :string = api_address + userByKey_endpoint + userkey;
    console.log(address);
     this.httpClient
      .get<User>(address)
      .subscribe(
        (res) => {
          this.user = res;
        });
  }
  getUserName(){
    return new Promise((resolve) => {
      if(typeof this.user === "undefined"){
        setTimeout(()=>{
          if(typeof this.user === "undefined"){
            setTimeout(()=>{
              if(!(typeof this.user === "undefined"))
                resolve(this.user.name)
            },100)
          }else
            resolve(this.user.name)
          }, 100);
      }
    });
  }

  registerUser(info : RegistrationModel){
    console.log(info);
    this.httpClient
      .post<LoginModel>(this.REGISTER_API, info)
      .subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
