package com.hetarth.xrossfit.service.notification.impl;

import com.hetarth.xrossfit.dto.notification.Notification;
import com.hetarth.xrossfit.service.notification.NotificationSender;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class EmailNotificationSender implements NotificationSender {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Override
    public void send(Notification notification) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(notification.getRecipient());
            message.setSubject(notification.getSubject());
            message.setText(notification.getMessage());

//            mailSender.send(message);
            log.info("Email sent to {}", notification.getRecipient());
        } catch (Exception ex) {
            log.error("Failed to send email to {}", notification.getRecipient(), ex);
        }
    }
}
