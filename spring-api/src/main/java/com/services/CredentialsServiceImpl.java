package com.services;
import com.dao.CredentialsDaoInterface;
import com.entity.Credentials;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CredentialsServiceImpl implements CredentialsServiceInterface {

    private final CredentialsDaoInterface credentialsDaoInterface;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public CredentialsServiceImpl(CredentialsDaoInterface credentialsDaoImpl, PasswordEncoder passwordEncoder) {
        this.credentialsDaoInterface = credentialsDaoImpl;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public Credentials get(String key) {
        return this.credentialsDaoInterface.getCredentials(key);
    }

    @Override
    @Transactional
    public void save(Credentials credentials) {
        credentials.setPassword(passwordEncoder.encode(credentials.getPassword()));
        this.credentialsDaoInterface.saveCredentials(credentials);
    }
}
