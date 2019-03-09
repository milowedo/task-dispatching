import {Issue} from '../entities/issue.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {api_address, detail_endpoint, issue_endpoint} from '../globals/globals';
import {Subject} from 'rxjs';
import {IssueDetail} from '../entities/issueDetail.model';

@Injectable()
export class IssueService {

  private issues: Issue[] = [];
  issuesChanged = new Subject<Issue[]>();

  private detail: IssueDetail = null;
  detailChanged = new Subject<IssueDetail>();

  private issue: Issue = null;
  singleIssueSubject = new Subject<Issue>();

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) {}

  public fetchSingleIssue(id: number) {
    if(this.issues.length > 0){
      this.setIssue(this.issues[id-1]);
    }
    let address = api_address+issue_endpoint+id.toString();
    this.httpClient
      .get<Issue>(address, this.httpOptions)
      .subscribe(
        (res: Issue) => this.setIssue(res)
      );
  }
  private setIssue(issue: Issue){
    this.issue = issue;
    this.singleIssueSubject.next(this.issue);
  }
  public getSingleIssue(id: number) {
    if(this.issues.length > 0){
      return this.issues[id-1];
    }
    return this.issue;
  }

  public fetchDetail(id: number){
    let address = api_address+detail_endpoint+id.toString();
    this.httpClient
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
    this.issuesChanged.next(this.issues.slice());
  }
  public getIssues(){
    return this.issues;
  }
}
