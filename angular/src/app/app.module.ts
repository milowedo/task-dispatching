import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {DEFAULT_TIMEOUT, HttpRequestInterceptor} from './request-interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import {DropdownDirective} from './directives/dropdown.directive';
import {AppRoutingModule} from './app.routing';
import { IssueListComponent } from './issue/issue-list/issue-list.component';
import { IssueEditComponent } from './issue/issue-edit/issue-edit.component';
import { IssueListElementComponent } from './issue/issue-list/issue-list-element/issue-list-element.component';
import { FullIssueComponent } from './issue/full-issue/full-issue.component';
import { IssueTabComponent } from './issue/issue-tab.component';
import {IssueService} from './services/issue.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {LoginComponent} from './login/login.component';
import {UserService} from './services/user.service';
import { SuccessfulLoginComponent } from './login/successful-login/successful-login.component';
import {NavbarService} from './services/navbar.service';
import {AuthGuard} from './services/auth-guard.service';
import { RegisterComponent } from './login/register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    IssueListElementComponent,
    IssueListComponent,
    IssueEditComponent,
    IssueListElementComponent,
    FullIssueComponent,
    IssueTabComponent,
    LoginComponent,
    SuccessfulLoginComponent,
    RegisterComponent,
    UserProfileComponent,
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
  ],
  providers: [
    [{ provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true }],
    [{ provide: DEFAULT_TIMEOUT, useValue: 30000 }],
    IssueService,
    UserService,
    NavbarService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
