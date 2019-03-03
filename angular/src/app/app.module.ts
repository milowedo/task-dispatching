import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HttpResponseInterceptor} from './response-interceptor';
import {DEFAULT_TIMEOUT, HttpRequestInterceptor} from './request-interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import {DropdownDirective} from './directives/dropdown.directive';
import {AppRoutingModule} from './app.routing';
import { ChangeIssueComponent } from './issue/issue-subscription/change-issue/change-issue.component';
import { SubscribeIssueComponent } from './issue/issue-subscription/subscribe-issue/subscribe-issue.component';
import { IssueListComponent } from './issue/issue-list/issue-list.component';
import {IssueSubComponent} from './issue/issue-subscription/issue-sub.component';
import { IssueEditComponent } from './issue/issue-edit/issue-edit.component';
import { IssueListElementComponent } from './issue/issue-list/issue-list-element/issue-list-element.component';
import { FullIssueComponent } from './issue/full-issue/full-issue.component';
import { IssueTabComponent } from './issue/issue-tab.component';
import {IssueService} from './services/issue.service';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
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
    NgbModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [
    [{ provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }],
    [{ provide: DEFAULT_TIMEOUT, useValue: 30000 }],
    {provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseInterceptor,
      multi: true},
    IssueService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
