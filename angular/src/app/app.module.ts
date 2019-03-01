import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HttpResponseInterceptor} from './response-interceptor';
import {DEFAULT_TIMEOUT, HttpRequestInterceptor} from './request-interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import {DropdownDirective} from './directives/dropdown.directive';
import { SubscribeEmployeeComponent } from './employee/subscribe-employee/subscribe-employee.component';
import { ChangeEmployeeComponent } from './employee/change-employee/change-employee.component';
import { EmployeeComponent } from './employee/employee.component';
import {AppRoutingModule} from './app.routing';
import { ChangeIssueComponent } from './issue/issue-subscription/change-issue/change-issue.component';
import { SubscribeIssueComponent } from './issue/issue-subscription/subscribe-issue/subscribe-issue.component';
import { IssueListComponent } from './issue/issue-list/issue-list.component';
import {IssueSubComponent} from './issue/issue-subscription/issue-sub.component';
import { IssueEditComponent } from './issue/issue-edit/issue-edit.component';
import { IssueListElementComponent } from './issue/issue-list/issue-list-element/issue-list-element.component';
import { FullIssueComponent } from './issue/full-issue/full-issue.component';
import { IssueTabComponent } from './issue/issue-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    SubscribeEmployeeComponent,
    ChangeEmployeeComponent,
    HeaderComponent,
    DropdownDirective,
    EmployeeComponent,
    IssueListElementComponent,
    ChangeIssueComponent,
    SubscribeIssueComponent,
    IssueListComponent,
    IssueSubComponent,
    IssueEditComponent,
    IssueListElementComponent,
    FullIssueComponent,
    IssueTabComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    [{ provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }],
    [{ provide: DEFAULT_TIMEOUT, useValue: 30000 }],
    {provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseInterceptor,
      multi: true},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
