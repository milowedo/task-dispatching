import {Ticket} from '../entities/ticket.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import {api_address} from '../globals/globals';

@Injectable()
export class TicketService {

  private tickets: Ticket[] = [];
  ticketsChanged = new EventEmitter<Ticket[]>();
  ticketClicked = new EventEmitter<Ticket>();
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
    this.ticketsChanged.emit(this.tickets.slice());
  }

  public getTickets(){
    return this.tickets;
  }
}
