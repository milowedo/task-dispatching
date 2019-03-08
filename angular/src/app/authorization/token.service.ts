import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class TokenService {

  private TOKEN_KEY = 'AuthToken';
  private USER_KEY = 'AuthUserkey';

  public saveToken(token: string) {
    window.sessionStorage.removeItem(this.TOKEN_KEY);
    window.sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string {
    return window.sessionStorage.getItem(this.TOKEN_KEY);
  }

  public saveUserkey(username: string) {
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY, username);
  }

  public getUserkey(): string {
    return window.sessionStorage.getItem(this.USER_KEY);
  }

  public logout() {
    window.sessionStorage.clear();
  }


}
