package com.hetarth.xrossfit.controller.impl;

import com.hetarth.xrossfit.controller.AuthController;
import com.hetarth.xrossfit.dto.SignupRequest;
import com.hetarth.xrossfit.dto.SignupResponse;
import com.hetarth.xrossfit.entity.User;
import com.hetarth.xrossfit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthControllerImpl implements AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    @Override
    public ResponseEntity<SignupResponse> signup(@RequestBody SignupRequest request){
        try{
            User user = userService.signup(request);
            SignupResponse response=new SignupResponse();
            response.setId(user.getId());
            response.setUsername(user.getUsername());
            response.setEmailVerified(user.getEmailVerified());
            response.setRole(user.getRole().name());
            response.setToken("");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch(Exception e){
            SignupResponse response=new SignupResponse();
            response.setError(e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }
}
