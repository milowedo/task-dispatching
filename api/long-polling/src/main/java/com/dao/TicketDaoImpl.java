package com.dao;

import com.entity.Ticket;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TicketDaoImpl implements TicketDaoInterface {

    private final SessionFactory sessionFactory;

    @Autowired
    public TicketDaoImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public void addTicket(Ticket ticket) {
        Session session = sessionFactory.getCurrentSession();
        session.saveOrUpdate(ticket);
    }

    @Override
    public Ticket getTicket(int ticketID) {
        System.out.println("in the get ticket dao");
        Session currentSession = sessionFactory.getCurrentSession();
        Query<Ticket> ticketQuery = currentSession.createQuery(
                "from Ticket where ticket_id = :ticketId ", Ticket.class)
                .setParameter("ticketId", ticketID);
        return ticketQuery.uniqueResult();
    }

    @Override
    public List<Ticket> getAllTickets() {
        Session currentSession = sessionFactory.getCurrentSession();

        Query<Ticket> theQuery = currentSession.createQuery(
                "from Ticket", Ticket.class);
        return theQuery.getResultList();
    }
}
