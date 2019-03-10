import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IssueListComponent} from './issue/issue-list/issue-list.component';
import {IssueSubComponent} from './issue/issue-subscription/issue-sub.component';
import {IssueEditComponent} from './issue/issue-edit/issue-edit.component';
import {FullIssueComponent} from './issue/full-issue/full-issue.component';
import {IssueTabComponent} from './issue/issue-tab.component';
import {LoginComponent} from './login/login.component';
import {SuccessfulLoginComponent} from './login/successful-login/successful-login.component';
import {AuthGuard} from './services/auth-guard.service';

const appRoutes: Routes = [
  {path: 'issueSub', component: IssueSubComponent},
  {path: 'issues', component: IssueTabComponent,
    children: [
      {path:'', component: IssueListComponent, runGuardsAndResolvers : 'always',},
    ], canActivate: [AuthGuard],
  runGuardsAndResolvers : 'always'},

  {path: 'issue', component: IssueTabComponent ,
    children: [
      {path:'new', component: IssueEditComponent},
      {path:':id', component: FullIssueComponent},
      {path:':id/edit', component: IssueEditComponent},
    ], canActivate: [AuthGuard],},

  {path: 'login', component: LoginComponent},
  {path:'welcome', component: SuccessfulLoginComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
