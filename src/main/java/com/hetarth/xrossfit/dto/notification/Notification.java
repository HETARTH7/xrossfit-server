package com.hetarth.xrossfit.dto.notification;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class Notification {
    private String recipient;
    private String subject;
    private String message;
}
