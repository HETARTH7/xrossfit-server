package com.hetarth.xrossfit.controller.impl;

import com.hetarth.xrossfit.controller.AuthController;
import com.hetarth.xrossfit.dto.auth.LoginRequest;
import com.hetarth.xrossfit.dto.auth.LoginResponse;
import com.hetarth.xrossfit.dto.auth.SignupRequest;
import com.hetarth.xrossfit.dto.auth.SignupResponse;
import com.hetarth.xrossfit.entity.User;
import com.hetarth.xrossfit.service.AuthenticationService;
import com.hetarth.xrossfit.service.JwtService;
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
    private AuthenticationService authenticationService;
    @Autowired
    private JwtService jwtService;

    @PostMapping("/signup")
    @Override
    public ResponseEntity<SignupResponse> signup(@RequestBody SignupRequest request){
        try{
            User user = authenticationService.signup(request);
            String jwtToken = jwtService.generateToken(user);
            SignupResponse response=new SignupResponse();
            response.setId(user.getId());
            response.setUsername(user.getUsername());
            response.setEmailVerified(user.getEmailVerified());
            response.setRole(user.getRole().name());
            response.setToken(jwtToken);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch(Exception e){
            SignupResponse response=new SignupResponse();
            response.setError(e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    @PostMapping("/login")
    @Override
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request){
        try{
            User user = authenticationService.login(request);
            String jwtToken = jwtService.generateToken(user);
            LoginResponse response = new LoginResponse();
            response.setId(user.getId());
            response.setUsername(user.getUsername());
            response.setEmailVerified(user.getEmailVerified());
            response.setRole(user.getRole().name());
            response.setToken(jwtToken);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch(Exception e){
            LoginResponse response=new LoginResponse();
            response.setError(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}
