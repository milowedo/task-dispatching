package com.dao;

import com.entity.IssueDetail;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class IssueDetailDaoImpl implements IssueDetailDaoInterface {

    private final SessionFactory sessionFactory;

    @Autowired
    public IssueDetailDaoImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }


    @Override
    public IssueDetail getDetail(int issueID) {
        Session session = this.sessionFactory.getCurrentSession();
        Query<IssueDetail> query = session.createQuery("from issue_detail where issue_id=:ID", IssueDetail.class)
                .setParameter("ID", issueID);
        return query.getSingleResult();
    }

    @Override
    public int addDetail(IssueDetail detail) {
        Session session = this.sessionFactory.getCurrentSession();
        session.saveOrUpdate(detail);
        return detail.getId();
    }

    @Override
    public void deleteDetail(int issueID) {
        Session session = this.sessionFactory.getCurrentSession();
        Query<IssueDetail> query = session.createQuery("delete from issue_detail where issue_id=:ID", IssueDetail.class)
                .setParameter("ID", issueID);
        query.executeUpdate();
    }
}
