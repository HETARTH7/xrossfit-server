package com.hetarth.xrossfit.dto.user;

public interface PersonalDetailsResponse {
    String getFirstName();
    String getLastName();
    String getDisplayName();
    String getEmail();
    boolean getEmailVerified();
    String getPhoneNumber();
}
