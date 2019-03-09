import {User} from '../entities/user.model';
import {HttpClient} from '@angular/common/http';
import {api_address, userByKey_endpoint} from '../globals/globals';
import {Injectable} from '@angular/core';

@Injectable()
export class UserService {
  user: User;
  userNamePromise;

  constructor(private httpClient : HttpClient){}

  isLoggedIn () {
    return new Promise(
      resolve => resolve(this.user != null));
  }

  fetchUserByUserkey(userkey : string) {
    let address :string = api_address + userByKey_endpoint + userkey;
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
}
