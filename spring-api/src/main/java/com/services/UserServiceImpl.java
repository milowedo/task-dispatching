package com.services;
import com.LongPolling.ServicePoll;
import com.entity.Credentials;
import com.entity.RegistrationModel;
import com.entity.User;
import com.dao.UserDaoInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserServiceImpl extends ServicePoll implements UserServiceInterface {

    private final UserDaoInterface userDaoInterface;
    private final CredentialsServiceInterface credentialsService;

    @Autowired
    public UserServiceImpl(UserDaoInterface userDaoInterface, CredentialsServiceInterface credentialsService) {
        this.userDaoInterface = userDaoInterface;
        this.credentialsService = credentialsService;
    }

    @Override
    @Transactional
    public List<User> getAllUsers() {
        return userDaoInterface.getAllUsers();
    }

    @Override
    @Transactional
    public int saveUser(RegistrationModel theUser) {
        String userKey = (theUser.getName().substring(0,3) + theUser.getSurname().substring(0,3)).toUpperCase();

        User user = new User();
        user.setName(Character.toUpperCase(theUser.getName().charAt(0)) + theUser.getName().substring(1).toLowerCase());
        user.setSurname(Character.toUpperCase(theUser.getSurname().charAt(0)) + theUser.getSurname().substring(1).toLowerCase());
        user.setKey(userKey);
        user.setTeamName("NEW EMPLOYEE");
        user.setEmail(theUser.getEmail());
        userDaoInterface.saveUser(user);

        Credentials credentials = new Credentials();
        credentials.setKey(userKey);
        credentials.setEmail(theUser.getEmail());
        credentials.setPassword(theUser.getPassword());
        credentialsService.save(credentials);

        return user.getId();
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
    public void updateUser(User user) {
        userDaoInterface.updateUser(user);
    }

    @Override
    @Transactional
    public User getUserByKey(String key) {
        return userDaoInterface.getUserByKey(key);
    }

}
