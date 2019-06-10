import { Component, OnInit } from '@angular/core';
import {User} from '../../entities/user.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit {
  user: User = new User(	1	, "John",	"Locke",	"JOHLOC",	"finances",
    "johnlocke@gmail.com", null);
  pathKey: string  = "";
  defaultImage: string = "../../../assets/blank-profile-picture.png";
  userForm: FormGroup;
  private uploadedPicture: File;
  private reader = new FileReader();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) { }


  ngOnInit() {
    this.createForm();
    this.route.params
      .subscribe(
        (param : Params) => {
          this.pathKey = param['key'];
          this.userService
            .getUserByUserKey(this.pathKey)
            .subscribe(
              (result) =>{
                if(!this.userService.isAuthenticated || result.key != this.userService.user.key) {
                  this.editNotAllowed();
                  return;
                }
                this.user = result;
                // if(this.user.image != null)
                //   this.parseImageFile(this.user.image);
                this.initializeForm();
              })
        });
  }

  private parseImageFile(image: File){
    this.reader.readAsDataURL(image);
    this.reader.onload = () => {
      this.defaultImage = this.reader.result;
    };
  }

  private createForm(){
    let team = '';
    let email = '';
    let photo:File = null;

    this.userForm = new FormGroup({
      'team' : new FormControl(team,
        Validators.compose([Validators.required])),
      'email' : new FormControl(email,
        Validators.compose([Validators.required,
          Validators.email])),
      'photo' : new FormControl(photo),
    });
  }

  private initializeForm(){
    this.userForm.patchValue({
      team : this.user.teamName,
      email : this.user.email,
      photo : this.user.image});
  }

  onSubmit() {
    const updatedUser = this.user;
    if(this.defaultImage != "../../../assets/blank-profile-picture.png")
      this.userService.user.image = this.defaultImage;
    this.userService.user.email = this.userForm.get('email').value;
    this.userService.user.teamName = this.userForm.get('team').value;
    updatedUser.teamName = this.userForm.get('team').value;
    //updatedUser.image = this.userForm.get('photo').value;
    updatedUser.email = this.userForm.get('email').value;
    this.userService.updateUser(updatedUser);
    setTimeout(() =>
      {
        this.leaveEdit()
      },
      800);
  }


  leaveEdit() {
    this.userForm.reset();
    this.router.navigate(['..'], {relativeTo: this.route})
  }

  onNewPhotoAdded(event){
    console.log(event);
    this.uploadedPicture = <File>event.target.files[0];
    this.reader.readAsDataURL(this.uploadedPicture);
    this.reader.onload = () => {
      this.defaultImage = this.reader.result;
      this.user.image = this.reader.result;
    };
    // this.userForm.patchValue({
    //   photo : this.uploadedPicture
    // });
}

  editNotAllowed(){
    this.router.navigate(['..'], {relativeTo: this.route})
  }

}
