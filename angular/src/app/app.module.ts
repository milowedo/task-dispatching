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
import { ChangeTicketComponent } from './ticket/ticket-sub/change-ticket/change-ticket.component';
import { SubscribeTicketComponent } from './ticket/ticket-sub/subscribe-ticket/subscribe-ticket.component';
import { TicketListComponent } from './ticket/ticket-list/ticket-list.component';
import {TicketSubComponent} from './ticket/ticket-sub/ticket-sub.component';
import { TicketEditComponent } from './ticket/ticket-edit/ticket-edit.component';
import { TicketListElementComponent } from './ticket/ticket-list/ticket-list-element/ticket-list-element.component';
import { FullTicketComponent } from './ticket/full-ticket/full-ticket.component';
import { TicketTabComponent } from './ticket/ticket-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    SubscribeEmployeeComponent,
    ChangeEmployeeComponent,
    HeaderComponent,
    DropdownDirective,
    EmployeeComponent,
    TicketListElementComponent,
    ChangeTicketComponent,
    SubscribeTicketComponent,
    TicketListComponent,
    TicketSubComponent,
    TicketEditComponent,
    TicketListElementComponent,
    FullTicketComponent,
    TicketTabComponent,
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
