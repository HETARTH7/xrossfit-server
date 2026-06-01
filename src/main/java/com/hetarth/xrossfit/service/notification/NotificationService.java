package com.hetarth.xrossfit.service.notification;

import com.hetarth.xrossfit.dto.notification.Notification;
import com.hetarth.xrossfit.event.WorkoutSummaryEvent;
import com.hetarth.xrossfit.service.notification.impl.EmailNotificationSender;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {
    private final EmailNotificationSender emailSender;

    public void sendWelcomeNotification(String username, String email) {
        Notification notification = Notification.builder()
                .recipient(email)
                .subject("Welcome to XrossFit " + username)
                .message("Welcome to XrossFit!")
                .build();
        emailSender.send(notification);
    }

    public void sendDailyWorkoutSummary(WorkoutSummaryEvent workoutSummaryEvent) {
        Notification notification = Notification.builder()
                .recipient(workoutSummaryEvent.getEmail())
                .subject("Workout Summary")
                .message(workoutSummaryEvent.toString())
                .build();
        emailSender.send(notification);
    }
}
