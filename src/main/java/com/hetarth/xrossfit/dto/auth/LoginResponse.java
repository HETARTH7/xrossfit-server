package com.hetarth.xrossfit.dto.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private Long id;
    private String username;
    private boolean emailVerified;
    private String role;
    private String token;
    private String error;
}
