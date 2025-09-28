package com.hetarth.xrossfit.service;

import com.hetarth.xrossfit.dto.auth.LoginRequest;
import com.hetarth.xrossfit.dto.auth.SignupRequest;
import com.hetarth.xrossfit.entity.User;

public interface UserService {
    User signup(SignupRequest request);
    User login(LoginRequest request);
}
