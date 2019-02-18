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
import { SingleTicketComponent } from './ticket/singleTicket.component';
import { ChangeTicketComponent } from './ticket/ticket-sub/change-ticket/change-ticket.component';
import { SubscribeTicketComponent } from './ticket/ticket-sub/subscribe-ticket/subscribe-ticket.component';
import { TicketListComponent } from './ticket/ticket-list/ticket-list.component';
import {TicketSubComponent} from './ticket/ticket-sub/ticket-sub.component';

@NgModule({
  declarations: [
    AppComponent,
    SubscribeEmployeeComponent,
    ChangeEmployeeComponent,
    HeaderComponent,
    DropdownDirective,
    EmployeeComponent,
    SingleTicketComponent,
    ChangeTicketComponent,
    SubscribeTicketComponent,
    TicketListComponent,
    TicketSubComponent,
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
