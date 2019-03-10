import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {UserService} from './user.service';

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.checkAuthenticated()
      .then(
        (auth:boolean) => {
          if(auth) {
            return true;
          }else {
            this.router.navigate(['']);
          }
        });
  }
}
