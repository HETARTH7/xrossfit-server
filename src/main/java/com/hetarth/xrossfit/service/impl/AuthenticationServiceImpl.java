package com.hetarth.xrossfit.service.impl;

import com.hetarth.xrossfit.dao.UserDAO;
import com.hetarth.xrossfit.dto.auth.LoginRequest;
import com.hetarth.xrossfit.dto.auth.SignupRequest;
import com.hetarth.xrossfit.entity.User;
import com.hetarth.xrossfit.service.AuthenticationService;
import com.hetarth.xrossfit.utils.Role;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    @Autowired
    private UserDAO userDAO;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;


    @Override
    public User signup(SignupRequest request){
        log.info("Attempting signup for username: {}", request.getUsername());
        try {
            if(userDAO.existsByUsername(request.getUsername())){
                log.warn("Signup failed: Username '{}' is already taken", request.getUsername());
                throw new RuntimeException("Username already taken");
            }
            if(userDAO.existsByEmail(request.getEmail())){
                log.warn("Signup failed: Email '{}' is already in use", request.getEmail());
                throw new RuntimeException("Email already in use");
            }
            if(request.getFirstName()==null || request.getLastName()==null || request.getUsername()==null || request.getEmail()==null || request.getPassword()==null){
                log.warn("Signup failed: Missing required fields for username: {}", request.getUsername());
                throw new RuntimeException("All fields must be filled.");
            }
            User user = new User();
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());
            user.setUsername(request.getUsername());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setRole(Role.USER);

            User savedUser = userDAO.save(user);
            log.info("User created successfully with id={} and username={}", savedUser.getId(), savedUser.getUsername());

            return savedUser;
        } catch (Exception e) {
            log.warn("Signup failed for user: {}. Reason: {}", request.getUsername(), e.getMessage());
            throw e;
        }
    }

    @Override
    public User login(LoginRequest request) {
        log.info("Attempting login for email: {}", request.getEmail());

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            log.info("Authentication successful for email: {}", request.getEmail());
        } catch (Exception e) {
            log.warn("Authentication failed for email: {}. Reason: {}", request.getEmail(), e.getMessage());
            throw e;
        }

        Optional<User> userOpt = userDAO.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) {
            log.warn("Login failed: No user found with email: {}", request.getEmail());
            throw new RuntimeException("Invalid credentials");
        }

        User user = userOpt.get();
        log.info("User login successful for username={} (id={})", user.getUsername(), user.getId());
        return user;
    }
}
