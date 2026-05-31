package com.hetarth.xrossfit.service.notification;

import com.hetarth.xrossfit.dto.notification.Notification;

public interface NotificationSender {
    void send(Notification notification);
}
