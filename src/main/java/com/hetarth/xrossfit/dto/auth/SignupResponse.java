package com.hetarth.xrossfit.dto.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupResponse {
    private Long id;
    private String displayName;
    private boolean emailVerified;
    private String role;
    private String token;
    private String error;
}
