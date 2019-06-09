package com.services;

import com.LongPolling.ServiceInterface;
import com.entity.RegistrationModel;
import com.entity.User;

import java.util.List;

public interface UserServiceInterface extends ServiceInterface {

    List<User> getAllUsers();
    int saveUser(RegistrationModel user);
    User getUser(int id);
    void deleteUser(int id);
    User getUserByKey(String key);
    void updateUser(User user);
}

