package com.hetarth.xrossfit.event;

public record UserRegisteredEvent(Long userId, String email) {
}