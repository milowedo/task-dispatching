package com.restController;

import com.dao.LoginForm;
import com.entity.Credentials;
import com.services.CredentialsServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private CredentialsServiceInterface credentialsServiceInterface;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(CredentialsServiceInterface credentialsServiceInterface, PasswordEncoder passwordEncoder) {
        this.credentialsServiceInterface = credentialsServiceInterface;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginForm loginRequest) {
        Credentials credentials = credentialsServiceInterface.get(loginRequest.getKey());
        if(passwordEncoder.matches(
                loginRequest.getPassword(), credentials.getPassword())) {
            return ResponseEntity.ok(credentials);
        }else return ResponseEntity.badRequest().build();
    }
}
