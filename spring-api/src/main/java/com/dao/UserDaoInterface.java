package com.dao;

import java.util.List;
import com.entity.User;

public interface UserDaoInterface {

	List<User> getAllUsers();
	int saveUser(User user);
	User getUser(int id);
	void deleteUser(int id);
    User getUserByKey(String key);
}
