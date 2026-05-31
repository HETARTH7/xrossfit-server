package com.hetarth.xrossfit.listener;

import com.hetarth.xrossfit.event.UserRegisteredEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.context.event.EventListener;

@Slf4j
@Component
public class NotificationListener {

    @Async
    @EventListener
    public void handleUserRegistered(UserRegisteredEvent event) {
        log.info("Notification sent to {} on thread: {}", event.email(), Thread.currentThread().getName());
    }
}