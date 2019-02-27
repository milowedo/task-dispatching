package com.services;

import com.LongPolling.ServicePoll;
import com.dao.IssueDaoFactory;
import com.entity.Issue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;


@Service
public class TicketServiceImpl extends ServicePoll implements TicketServiceInterface{

    private final IssueDaoFactory issueDaoFactory;

    @Autowired
    public TicketServiceImpl(IssueDaoFactory issueDaoFactory) {
        this.issueDaoFactory = issueDaoFactory;
    }

    @Override
    @Transactional
    public int addTicket(Issue issue) {
        int id = issueDaoFactory.addIssue(issue);
        this.notifyOfChange(issue);
        return id;
    }

    @Override
    @Transactional
    public Issue getTicket(int ticketID) {
        return issueDaoFactory.getIssue(ticketID);
    }

    @Override
    @Transactional
    public void deleteTicket(int ticketID){
        issueDaoFactory.deleteIssue(ticketID);
    }

    @Override
    @Transactional
    public List<Issue> getAllTickets() {
        return issueDaoFactory.getAllIssues();
    }


}
