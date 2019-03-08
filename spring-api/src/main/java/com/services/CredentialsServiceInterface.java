package com.services;
import com.entity.Credentials;

public interface CredentialsServiceInterface {

    Credentials get(String key);
    void save(Credentials credentials);
}
