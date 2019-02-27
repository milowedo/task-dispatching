package com.services;

import com.LongPolling.ServiceInterface;
import com.entity.Issue;

import java.util.List;

public interface TicketServiceInterface extends ServiceInterface {
    int addTicket(Issue issue);
    Issue getTicket(int ticketID);
    List<Issue> getAllTickets();
    void deleteTicket(int ticketID);
}
