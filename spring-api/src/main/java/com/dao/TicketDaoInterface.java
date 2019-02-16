package com.dao;

import com.entity.Ticket;

import java.util.List;

public interface TicketDaoInterface {

    int addTicket(Ticket ticket);
    Ticket getTicket(int ticketID);
    List<Ticket> getAllTickets();
    void deleteTicket(int ticketID);
}
