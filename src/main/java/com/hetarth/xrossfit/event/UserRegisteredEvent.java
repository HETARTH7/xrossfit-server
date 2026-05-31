package com.hetarth.xrossfit.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class UserRegisteredEvent {
    private String username;
    private String email;
}