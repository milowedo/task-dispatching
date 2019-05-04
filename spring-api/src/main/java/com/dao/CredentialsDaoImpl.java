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
        Query<Credentials> query;
        //we have to decide if we got an email address(@) or user_key([A-Z]{6})
        Session currentSession = this.sessionFactory.getCurrentSession();
        if (!key.contains("@")) {
            query = currentSession
                    .createQuery("from Credentials where user_key= :uKey", Credentials.class)
                    .setParameter("uKey", key);
        }else {
            query = currentSession
                    .createQuery("from Credentials where email= :uEmail", Credentials.class)
                    .setParameter("uEmail", key);
        }
        return query.uniqueResult();
    }

    @Override
    public void saveCredentials(Credentials credentials) {
        Session currentSession = this.sessionFactory.getCurrentSession();
        currentSession.save(credentials);
    }
}
