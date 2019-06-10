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
      .get<any>(address)
      .subscribe(
        (res) => {
          this.user = res;
        },
        (error1 => {
          console.log(error1);
        }));
  }

  getUserByUserKey(userkey : string){
    let address :string = api_address + userByKey_endpoint + userkey;
    console.log(address);
    return this.httpClient
      .get<User>(address);
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

  updateUser(updatedUser: User) {
    let address :string = api_address + user_endpoint;
    console.log("updating at: "  + address);
    this.httpClient
      .post<User>(address, updatedUser)
      .subscribe(
        (res) => {},
        (error1 => console.log("error updating: " + error1))
      )
  }
}
