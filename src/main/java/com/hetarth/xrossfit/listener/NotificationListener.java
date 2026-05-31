package com.hetarth.xrossfit.listener;

import com.hetarth.xrossfit.event.UserRegisteredEvent;
import com.hetarth.xrossfit.service.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.context.event.EventListener;

@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationListener {
    private final NotificationService notificationService;

    @Async
    @EventListener
    public void handleUserRegistered(UserRegisteredEvent event) {
        notificationService.sendWelcomeNotification(event.getUsername(), event.getEmail());
    }
}