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
    public int addTicket(Ticket ticket) {
        Session currentSession = sessionFactory.getCurrentSession();

        currentSession.save(ticket);
        return ticket.getTicketID();
    }

    @Override
    public Ticket getTicket(int ticketID) {
        Session currentSession = sessionFactory.getCurrentSession();
        Query<Ticket> ticketQuery = currentSession
                .createQuery("from Ticket where ticket_id = :ticketId ", Ticket.class)
                .setParameter("ticketId", ticketID);
        return ticketQuery.uniqueResult();
    }

    @Override
    public List<Ticket> getAllTickets() {
        Session currentSession = sessionFactory.getCurrentSession();

        Query<Ticket> theQuery = currentSession
                .createQuery(
                "from Ticket", Ticket.class);
        return theQuery.getResultList();
    }

    @Override
    public void deleteTicket(int ticketID) {
        Session currentSession = sessionFactory.getCurrentSession();

        Query query = currentSession
                .createQuery("delete from Ticket where ticket_id = :ticketId", Ticket.class)
                .setParameter("ticketId", ticketID);
        query.executeUpdate();
    }
}
