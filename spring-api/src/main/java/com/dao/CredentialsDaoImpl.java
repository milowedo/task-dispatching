package com.dao;

import com.entity.Credentials;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;



@Repository
public class CredentialsDaoImpl implements CredentialsDaoInterface {

    private final SessionFactory sessionFactory;

    @Autowired
    public CredentialsDaoImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public Credentials getCredentials(String key) {
        Session currentSession = this.sessionFactory.getCurrentSession();
        Query<Credentials> query = currentSession
                .createQuery("from Credentials where user_key= :uKey", Credentials.class)
                .setParameter("uKey", key);
        return query.uniqueResult();
    }

    @Override
    public void saveCredentials(Credentials credentials) {
        Session currentSession = this.sessionFactory.getCurrentSession();
        currentSession.save(credentials);
    }
}
