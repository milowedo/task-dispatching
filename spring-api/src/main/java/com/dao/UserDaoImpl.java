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
		System.out.println("saving new user: " + theUser.toString());
		currentSession.saveOrUpdate(theUser);
		return theUser.getId();
	}

	@Override
	public void updateUser(User user) {
		Session currentSession = sessionFactory.getCurrentSession();
		System.out.println("updating the user: " + user.toString());
		currentSession.update(user);
	}

	@Override
	public User getUser(int theId) {
		Session currentSession = sessionFactory.getCurrentSession();

		Query<User> query = currentSession.createQuery(
				"from User where user_id=:userID", User.class);
		query.setParameter("userID", theId);
		User user = null;
		try {
			user = query.getSingleResult();
		}catch (Exception e){
			e.printStackTrace();
		}
		return user;
	}

	@Override
	public void deleteUser(int theId) {
		Session currentSession = sessionFactory.getCurrentSession();
		
		Query theQuery =
				currentSession.createQuery("delete from User where user_id=:userID");
		theQuery.setParameter("userID", theId);
		theQuery.executeUpdate();		
	}

	@Override
	public User getUserByKey(String key) {
		Session currentSession = sessionFactory.getCurrentSession();
		Query<User> theQuery =
				currentSession.createQuery("from User where user_key=:userKEY", User.class);
		theQuery.setParameter("userKEY", key);
		User user = null;
		try {
			user = theQuery.getSingleResult();
		}catch (Exception e){
			e.printStackTrace();
		}
		return user;
	}
}











