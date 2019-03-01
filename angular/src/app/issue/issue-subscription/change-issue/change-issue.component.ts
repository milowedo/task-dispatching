import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {api_address} from '../../../globals/globals';

@Component({
  selector: 'app-change-issue',
  templateUrl: './change-issue.component.html'
})
export class ChangeIssueComponent{

  constructor(private httpClient:HttpClient){}

  issueID: string = '3';

  updateProfile() {
    let address: string =  api_address+'issue/trigger/' + this.issueID;
    this.httpClient.get(address)
      .subscribe(
        (data: any) => {
          console.log(data);
        },
          () => this.issueID = "no such issue",
      );
  }

  onNameKeyUp(ev: any){
    this.issueID = ev.target.value;
  }

}
