# Notification System — Design Decision

**Project:** Xrossfit  
**Status:** Decided  
**Last updated:** May 2026

---

## Context

As part of building the fitness app, we need a notification system to communicate with users on key events — account activity, workout completions, premium upgrades, and daily summaries. This document captures the options evaluated, the decision made, the reasoning behind it, and the roadmap for evolving the system as the product grows.

---

## Options Evaluated

### 1. JavaMailSender + Spring Boot Mail (SMTP)

Built-in Spring abstraction over SMTP. Sends emails directly via a configured mail server (Gmail, Mailtrap, etc.).

**Pros**
- Zero extra dependencies beyond Spring Boot
- Free to use with Gmail or Mailtrap for development
- Simple to set up and debug

**Cons**
- Poor deliverability at volume (risk of landing in spam)
- No delivery analytics or bounce handling
- SMTP handshake adds latency if called synchronously

---

### 2. Third-party Email API (SendGrid / AWS SES / Mailgun)

Managed email delivery services with dedicated APIs, template management, and delivery analytics.

**Pros**
- High deliverability with domain authentication (SPF, DKIM)
- Delivery reports, open rates, bounce tracking
- Built-in rate limiting and retry logic

**Cons**
- Cost at volume (though free tiers are generous)
- External dependency to manage

---

### 3. WebSockets (STOMP)

Real-time bidirectional connection between the Spring Boot backend and the React frontend for in-app push notifications.

**Pros**
- Instant in-app delivery (bell icon, toast notifications)
- No email required — works entirely within the app

**Cons**
- Requires persistent connection management
- More complex infrastructure (load balancer must support WebSocket)
- Overkill for transactional notifications

---

### 4. Message Queue (Kafka / RabbitMQ)

Async event bus where the app publishes notification events and a consumer processes them independently.

**Pros**
- Full decoupling between producer and consumer
- Message durability — survives app restarts
- Enables rate limiting and replay of failed messages
- Supports multiple consumers (email, SMS, push) from one event

**Cons**
- Significant infrastructure overhead
- Requires distributed tracing to debug across services
- Overkill for a single-app, early-stage product

---

### 5. Firebase Cloud Messaging (FCM)

Google's push notification service for mobile and browser clients.

**Pros**
- Works outside the app (device-level push)
- Supports iOS, Android, and web browsers

**Cons**
- Requires a mobile app or PWA
- Firebase dependency
- Not relevant until a mobile client exists

---

### 6. SMS (Twilio / AWS SNS)

Text message notifications for critical or time-sensitive events.

**Pros**
- Very high open rates
- Ideal for OTPs, payment alerts, and critical warnings

**Cons**
- Per-message cost
- Requires phone number collection and consent management
- Heavier compliance burden (TCPA, GDPR)

---

## Decision

**We are going with: JavaMailSender + Spring Events + `@Scheduled`**

Implemented as a **module within the existing Spring Boot monolith** — not a separate microservice.

### What this looks like

```
src/main/java/com/fitnessapp/
├── auth/
├── payment/
├── routine/
└── notification/
    ├── service/
    │   └── EmailService.java
    ├── event/
    │   ├── UserRegisteredEvent.java
    │   ├── PaymentConfirmedEvent.java
    │   └── RoutineCompletedEvent.java
    ├── listener/
    │   └── NotificationEventListener.java
    ├── scheduler/
    │   └── NotificationScheduler.java
    └── templates/emails/
        ├── welcome.html
        ├── payment-confirmation.html
        └── morning-digest.html
```

### Notifications in scope (Phase 1)

| Trigger | Type | Mechanism |
|---|---|---|
| User signup | Welcome email | Spring Event + `@Async` |
| User login | Login alert email | Spring Event + `@Async` |
| Premium payment | Payment confirmation email | Spring Event + `@Async` |
| Routine completed | Completion summary email | Spring Event + `@Async` |
| Every morning at 7AM | Previous day log + routine status | `@Scheduled` cron job |

---

## Why This Decision

### Module over microservice

Both a module and a microservice deliver the same **async, fire-and-forget behavior** for the user — signup returns in ~15ms regardless. The difference is purely operational.

A separate microservice would bring:
- Independent deployment and scaling
- Full failure isolation
- Message durability via a persistent queue
- The ability to use a different tech stack

But it also brings:
- A message broker (Kafka/RabbitMQ) to run and maintain
- Two codebases, two CI pipelines, two deployments to manage
- Distributed tracing to debug a single notification

These tradeoffs only pay off with multiple teams, multiple apps, or serious email volume. At this stage, the module gives us clean separation of concerns via Spring Events without the operational burden.

### Spring Events over direct calls

`AuthService` does not call `EmailService` directly. It publishes a `UserRegisteredEvent` and returns. The notification listener picks it up on a separate thread (`@Async`). This means:

- Business logic stays clean — auth doesn't know or care about email
- Adding a new notification type requires zero changes to existing services
- The notification module is independently testable

### JavaMailSender over a third-party API

For the current user base, SMTP via Gmail or Mailtrap is sufficient and free. The switch to a managed provider is a one-line config change when the time comes — the internal `EmailService` interface stays exactly the same.

---

## Future Plans

### Phase 2 — Switch to a managed email provider

**When:** Emails start landing in spam, or user base crosses ~100 active users.

**What changes:** Swap the SMTP configuration for SendGrid or AWS SES. No code changes to `EmailService`, `EventListener`, or templates — only `application.yml` and credentials change.

**Why:** Better deliverability, bounce handling, open rate tracking, and domain authentication (SPF/DKIM).

---

### Phase 3 — Add in-app real-time notifications

**When:** Users request a notification bell or toast UI in the React app, or the product roadmap calls for real-time feedback (e.g. live workout tracking).

**What changes:** Add Spring WebSocket (STOMP) alongside the existing email system. The two channels coexist — events can trigger both an email and an in-app push.

**Why:** Email is asynchronous by nature. In-app notifications give users immediate feedback without leaving the browser.

---

### Phase 4 — Extract to a notification microservice

**When:** Any of the following become true:
- Deploying an email template change requires a full app redeploy and that becomes painful
- The morning digest job starts affecting API performance during peak hours
- A second app (coach portal, admin dashboard) also needs to send notifications
- The team grows and a separate squad wants to own notifications independently

**What changes:** The notification module is extracted into a standalone Spring Boot service. Spring Events are replaced with a message queue (Kafka or RabbitMQ). The main app publishes events to the queue; the notification service consumes them.

**Why:** At this point the benefits of isolation, independent scaling, and message durability outweigh the added complexity.

Internal code structure stays largely the same — `EmailService`, templates, and scheduler logic are carried over unchanged. The main difference is the transport layer (queue instead of in-process events).

---

### Phase 5 — SMS and push notifications

**When:** A mobile app exists, or there is a product need for OTPs, critical alerts, or high-urgency notifications.

**What to add:** Twilio for SMS, Firebase FCM for mobile/browser push. Both integrate as additional consumers of the same notification events — no changes to how events are published.

---

## Summary

| Phase | What | Trigger |
|---|---|---|
| Now | JavaMailSender + Spring Events + `@Scheduled` as a module | Building the product |
| Phase 2 | Swap SMTP for SendGrid / AWS SES | Deliverability issues or 100+ users |
| Phase 3 | Add WebSocket in-app notifications | User demand for real-time UI feedback |
| Phase 4 | Extract to notification microservice + message queue | Multiple apps, teams, or deployment pain |
| Phase 5 | Add SMS (Twilio) and mobile push (FCM) | Mobile app launch |
