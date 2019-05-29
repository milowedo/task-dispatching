import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IssueListComponent} from './issue/issue-list/issue-list.component';
import {IssueEditComponent} from './issue/issue-edit/issue-edit.component';
import {FullIssueComponent} from './issue/full-issue/full-issue.component';
import {IssueTabComponent} from './issue/issue-tab.component';
import {LoginComponent} from './login/login.component';
import {SuccessfulLoginComponent} from './login/successful-login/successful-login.component';
import {AuthGuard} from './services/auth-guard.service';
import {RegisterComponent} from './login/register/register.component';

const appRoutes: Routes = [
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
  {path: 'register', component: RegisterComponent},
  {path:'welcome', component: SuccessfulLoginComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
