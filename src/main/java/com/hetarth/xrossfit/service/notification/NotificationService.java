package com.hetarth.xrossfit.service.notification;

import com.hetarth.xrossfit.dto.notification.Notification;
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
                .subject("Welcome to XrossFit")
                .message("Welcome to XrossFit!")
                .build();
        emailSender.send(notification);
    }
}
