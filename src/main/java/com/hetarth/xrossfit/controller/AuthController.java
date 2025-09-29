package com.hetarth.xrossfit.controller;

import com.hetarth.xrossfit.dto.auth.LoginRequest;
import com.hetarth.xrossfit.dto.auth.LoginResponse;
import com.hetarth.xrossfit.dto.auth.SignupRequest;
import com.hetarth.xrossfit.dto.auth.SignupResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

public interface AuthController {
    ResponseEntity<SignupResponse> signup(@RequestBody SignupRequest request);
    ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request);
}
