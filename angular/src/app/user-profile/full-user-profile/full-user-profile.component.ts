import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../entities/user.model';

@Component({
  selector: 'app-full-user-profile',
  templateUrl: './full-user-profile.component.html',
  styleUrls: ['./full-user-profile.component.css']
})
export class FullUserProfileComponent implements OnInit {
  user: User = new User(	1	, "John",	"Locke",	"JOHLOC",	"finances",
  "johnlocke@gmail.com", null);
  pathKey: string  = "";
  editMode: Promise<boolean>;
  defaultImage = "../../assets/blank-profile-picture.png";


  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (param : Params) => {
          this.pathKey = param['key'];
          if(this.userService.user.key == this.pathKey){
            this.user = this.userService.user;
            this.editMode = Promise.resolve(true);
            return;
          }
          this.userService
            .getUserByUserKey(this.pathKey)
            .subscribe(
              (result) =>{
                this.user = result;
                this.editMode = Promise.resolve(!this.userService.isAuthenticated || result.key == this.userService.user.key);
        })
        });
  }

  isEditModePossible() {
    return this.editMode;
  }

  onEditClicked(){
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

}
