package com.services;
import com.dao.CredentialsDaoInterface;
import com.entity.Credentials;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CredentialsServiceImpl implements CredentialsServiceInterface {

    private final CredentialsDaoInterface credentialsDaoInterface;

    @Autowired
    public CredentialsServiceImpl(CredentialsDaoInterface credentialsDaoImpl) {
        this.credentialsDaoInterface = credentialsDaoImpl;

    }

    @Override
    @Transactional
    public Credentials get(String key) {
        return this.credentialsDaoInterface.getCredentials(key);
    }

    @Override
    @Transactional
    public void save(Credentials credentials) {
        this.credentialsDaoInterface.saveCredentials(credentials);
    }
}
