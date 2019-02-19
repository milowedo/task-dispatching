import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EmployeeComponent} from './employee/employee.component';
import {TicketListComponent} from './ticket/ticket-list/ticket-list.component';
import {TicketSubComponent} from './ticket/ticket-sub/ticket-sub.component';
import {TicketEditComponent} from './ticket/ticket-edit/ticket-edit.component';
import {FullTicketComponent} from './ticket/full-ticket/full-ticket.component';
import {TicketTabComponent} from './ticket/ticket-tab.component';

const appRoutes = [
  {path: 'employeeSub', component: EmployeeComponent},
  {path: 'ticketSub', component: TicketSubComponent},
  {path: 'tickets', component: TicketTabComponent,
    children: [
      {path:'', component: TicketListComponent},
      {path:'add', component: TicketEditComponent},
      {path:':id', component: FullTicketComponent},
      {path:':id/edit', component: TicketEditComponent},
    ]},
  {path: '', redirectTo: '/tickets', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
