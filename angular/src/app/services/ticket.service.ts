import {Ticket} from '../entities/ticket.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {api_address} from '../globals/globals';
import {Subject} from 'rxjs';

@Injectable()
export class TicketService {

  private tickets: Ticket[] = [];
  ticketsChanged = new Subject<Ticket[]>();
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) {}

  public fetchAllTickets() {
    this
      .httpClient
      .get<Ticket[]>((api_address+'ticket/all'), this.httpOptions)
      .subscribe(
       res => this.setTickets(res)
      );
  }

  public setTickets(newSetOfTickets: Ticket[]){
    this.tickets = newSetOfTickets;
    this.ticketsChanged.next(this.tickets.slice());
  }

  public getTickets(){
    return this.tickets;
  }
}
