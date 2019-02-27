package com.dao;

import com.entity.Issue;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class IssueDaoImpl implements IssueDaoFactory {

    private final SessionFactory sessionFactory;

    @Autowired
    public IssueDaoImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public int addIssue(Issue issue) {
        Session currentSession = sessionFactory.getCurrentSession();
        currentSession.saveOrUpdate(issue);
        return issue.getId();
    }

    @Override
    public Issue getIssue(int id) {
        Session currentSession = sessionFactory.getCurrentSession();
        Query<Issue> query = currentSession
                .createQuery("from Issue where issue_id = :issueID ", Issue.class)
                .setParameter("issueID", id);
        return query.uniqueResult();
    }

    @Override
    public List<Issue> getAllIssues() {
        Session currentSession = sessionFactory.getCurrentSession();

        Query<Issue> theQuery = currentSession
                .createQuery(
                "from Issue", Issue.class);
        return theQuery.getResultList();
    }

    @Override
    public void deleteIssue(int id) {
        Session currentSession = sessionFactory.getCurrentSession();

        Query query = currentSession
                .createQuery("delete from Issue where issue_id = :issueID", Issue.class)
                .setParameter("issueID", id);
        query.executeUpdate();
    }
}
