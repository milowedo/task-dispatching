import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {IssueListComponent} from './issue/issue-list/issue-list.component';
import {IssueSubComponent} from './issue/issue-subscription/issue-sub.component';
import {IssueEditComponent} from './issue/issue-edit/issue-edit.component';
import {FullIssueComponent} from './issue/full-issue/full-issue.component';
import {IssueTabComponent} from './issue/issue-tab.component';
import {LoginComponent} from './login/login.component';

const appRoutes = [
  {path: 'issueSub', component: IssueSubComponent},
  {path: 'issues', component: IssueTabComponent,
    children: [
      {path:'', component: IssueListComponent},
    ]},
  {path: 'issue', component: IssueTabComponent ,
    children: [
      {path:'new', component: IssueEditComponent},
      {path:':id', component: FullIssueComponent},
      {path:':id/edit', component: IssueEditComponent},
    ]},
  {path: 'welcome', component: LoginComponent},
  {path: '', redirectTo: '/welcome', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
