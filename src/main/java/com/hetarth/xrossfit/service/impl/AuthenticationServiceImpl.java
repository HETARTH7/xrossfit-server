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
        log.info("Attempting signup for: {}", request.getDisplayName());
        if(userDAO.existsByDisplayName(request.getDisplayName())){
            log.warn("Signup failed: Username '{}' is already taken", request.getDisplayName());
            throw new RuntimeException("Username already taken");
        }
        if(userDAO.existsByEmail(request.getEmail())){
            log.warn("Signup failed: Email '{}' is already in use", request.getEmail());
            throw new RuntimeException("Email already in use");
        }
        if(request.getFirstName()==null || request.getLastName()==null || request.getDisplayName()==null || request.getEmail()==null || request.getPassword()==null){
            log.warn("Signup failed: Missing required fields for username: {}", request.getDisplayName());
            throw new RuntimeException("All fields must be filled.");
        }
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setDisplayName(request.getDisplayName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);

        User savedUser = userDAO.save(user);
        log.info("User created successfully with id={}", savedUser.getId());

        return savedUser;
    }

    @Override
    public User login(LoginRequest request) {
        log.info("Login attempt for email: {}", request.getEmail());

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        return userDAO.findByEmail(request.getEmail()).map(user -> {
                    log.info("Authentication successful for: {}", request.getEmail());
                    return user;
                }).orElseThrow(() -> new RuntimeException("Invalid credentials"));
    }
}
