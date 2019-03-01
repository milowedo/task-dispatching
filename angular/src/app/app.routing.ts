import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {IssueListComponent} from './issue/issue-list/issue-list.component';
import {IssueSubComponent} from './issue/issue-subscription/issue-sub.component';
import {IssueEditComponent} from './issue/issue-edit/issue-edit.component';
import {FullIssueComponent} from './issue/full-issue/full-issue.component';
import {IssueTabComponent} from './issue/issue-tab.component';

const appRoutes = [
  {path: 'issueSub', component: IssueSubComponent},
  {path: 'issues', component: IssueTabComponent,
    children: [
      {path:'', component: IssueListComponent},
      {path:':id', component: FullIssueComponent},
      {path:':id/edit', component: IssueEditComponent},
    ]},
  {path: 'issue', component: FullIssueComponent ,
    children: [
      {path:'new', component: IssueEditComponent}
      ]},
  {path: '', redirectTo: '/issues', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
