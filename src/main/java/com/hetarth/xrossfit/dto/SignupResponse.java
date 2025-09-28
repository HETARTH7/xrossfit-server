package com.hetarth.xrossfit.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupResponse {
    private Long id;
    private String username;
    private boolean emailVerified;
    private String role;
    private String token;
    private String error;
}
