package com.dao;

import java.util.List;
import com.entity.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImpl implements UserDaoInterface {

	private final SessionFactory sessionFactory;

	@Autowired
	public UserDaoImpl(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Override
	public List<User> getAllUsers() {
		Session currentSession = sessionFactory.getCurrentSession();

		Query<User> theQuery = currentSession.createQuery(
				"from User order by name", User.class);
		return theQuery.getResultList();
	}

	@Override
	public int saveUser(User theUser) {
		Session currentSession = sessionFactory.getCurrentSession();
		System.out.println(theUser.toString());
		currentSession.saveOrUpdate(theUser);
		return theUser.getId();
	}

	@Override
	public User getUser(int theId) {
		Session currentSession = sessionFactory.getCurrentSession();

		Query<User> query = currentSession.createQuery(
				"from User where user_id=:userID", User.class);
		query.setParameter("userID", theId);
		return query.getSingleResult();
	}

	@Override
	public void deleteUser(int theId) {
		Session currentSession = sessionFactory.getCurrentSession();
		
		Query theQuery =
				currentSession.createQuery("delete from User where user_id=:userID");
		theQuery.setParameter("userID", theId);
		theQuery.executeUpdate();		
	}
}











