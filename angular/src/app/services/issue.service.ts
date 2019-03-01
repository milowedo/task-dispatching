import {Issue} from '../entities/issue.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {api_address} from '../globals/globals';
import {Subject} from 'rxjs';

@Injectable()
export class IssueService {

  private issues: Issue[] = [];
  issueChanges = new Subject<Issue[]>();
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) {}

  public fetchAll() {
    this
      .httpClient
      .get<Issue[]>((api_address+'issue/all'), this.httpOptions)
      .subscribe(
       res => this.setAll(res)
      );
  }

  public setAll(values: Issue[]){
    this.issues = values;
    this.issueChanges.next(this.issues.slice());
  }

  public getAll(){
    return this.issues;
  }
}
