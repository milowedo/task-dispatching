package com.services;
import com.LongPolling.ServicePoll;
import com.entity.User;
import com.dao.UserDaoInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserServiceImpl extends ServicePoll implements UserServiceInterface {

    private final UserDaoInterface userDaoInterface;

    @Autowired
    public UserServiceImpl(UserDaoInterface userDaoInterface) {
        this.userDaoInterface = userDaoInterface;
    }

    @Override
    @Transactional
    public List<User> getAllUsers() {
        return userDaoInterface.getAllUsers();
    }

    @Override
    @Transactional
    public int saveUser(User theUser) {
        userDaoInterface.saveUser(theUser);
        this.notifyOfChange(theUser);
        return theUser.getId();
    }

    @Override
    @Transactional
    public User getUser(int theId) {
        return userDaoInterface.getUser(theId);
    }

    @Override
    @Transactional
    public void deleteUser(int theId) {
        userDaoInterface.deleteUser(theId);
    }

    @Override
    @Transactional
    public User getUserByKey(String key) {
        return userDaoInterface.getUserByKey(key);
    }

}
