package com.services;

import com.LongPolling.ServiceInterface;
import com.entity.Ticket;
import java.util.List;

public interface TicketServiceInterface extends ServiceInterface {
    int addTicket(Ticket ticket);
    Ticket getTicket(int ticketID);
    List<Ticket> getAllTickets();
    void deleteTicket(int ticketID);
}
