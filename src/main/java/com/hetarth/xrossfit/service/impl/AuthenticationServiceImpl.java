package com.hetarth.xrossfit.service.impl;

import com.hetarth.xrossfit.dao.UserDAO;
import com.hetarth.xrossfit.dto.auth.LoginRequest;
import com.hetarth.xrossfit.dto.auth.SignupRequest;
import com.hetarth.xrossfit.entity.User;
import com.hetarth.xrossfit.service.AuthenticationService;
import com.hetarth.xrossfit.utils.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
        if(userDAO.existsByUsername(request.getUsername())){
            throw new RuntimeException("Username already taken");
        }
        if(userDAO.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email already in use");
        }
        if(request.getFirstName()==null || request.getLastName()==null || request.getUsername()==null || request.getEmail()==null || request.getPassword()==null){
            throw new RuntimeException("All fields must be filled.");
        }
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        return userDAO.save(user);
    }

    @Override
    public User login(LoginRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        return userDAO.findByEmail(request.getEmail()).orElseThrow();
    }
}
