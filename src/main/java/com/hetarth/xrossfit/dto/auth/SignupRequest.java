package com.hetarth.xrossfit.dto.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
    private String firstName;
    private String lastName;
    private String displayName;
    private String email;
    private String password;
}
