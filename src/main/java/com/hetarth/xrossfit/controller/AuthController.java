package com.hetarth.xrossfit.controller;

import com.hetarth.xrossfit.dto.SignupRequest;
import com.hetarth.xrossfit.dto.SignupResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

public interface AuthController {
    ResponseEntity<SignupResponse> signup(@RequestBody SignupRequest request);
}
