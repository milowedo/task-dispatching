import {Issue} from '../entities/issue.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {api_address, issueDetail_endpoint} from '../globals/globals';
import {Subject} from 'rxjs';
import {IssueDetail} from '../entities/issueDetail.model';

@Injectable()
export class IssueService {

  private issues: Issue[] = [];
  issueChanged = new Subject<Issue[]>();

  private detail: IssueDetail = null;
  detailChanged = new Subject<IssueDetail>();

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) {}

  public fetchAllIssues() {
    this
      .httpClient
      .get<Issue[]>((api_address+'issue/all'), this.httpOptions)
      .subscribe(
       res => this.setIssues(res)
      );
  }
  private setIssues(values: Issue[]){
    this.issues = values;
    this.issueChanged.next(this.issues.slice());
  }
  public getIssues(){
    return this.issues;
  }
  public getSingleIssue(id: number) {
    return this.issues[id - 1];
  }

  public fetchDetail(id: number){
    let address = api_address+issueDetail_endpoint+id.toString();
    console.log(address);
    this
      .httpClient
      .get<IssueDetail>(address, this.httpOptions)
      .subscribe(
        res => this.setDetail(res)
      );
  }
  private setDetail(res: IssueDetail) {
    this.detail = res;
    this.detailChanged.next(this.detail);

  }
  public getDetail(){
    return this.detail;
  }
}
