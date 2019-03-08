package com.dao;

import com.entity.Credentials;

public interface CredentialsDaoInterface {
    Credentials getCredentials(String key);
    void saveCredentials(Credentials credentials);
}
