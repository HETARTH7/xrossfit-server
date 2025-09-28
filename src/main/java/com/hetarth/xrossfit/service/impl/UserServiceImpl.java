package com.hetarth.xrossfit.service.impl;

import com.hetarth.xrossfit.dao.UserDAO;
import com.hetarth.xrossfit.dto.SignupRequest;
import com.hetarth.xrossfit.entity.User;
import com.hetarth.xrossfit.service.UserService;
import com.hetarth.xrossfit.utils.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDAO userDAO;

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
        user.setPassword(request.getPassword());
        user.setRole(Role.USER);

        return userDAO.save(user);
    }
}
