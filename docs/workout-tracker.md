# Workout Tracking Feature

## Overview

The workout tracking feature allows users to log exercises along with exercise-specific metrics such as reps, weight, duration, distance, etc. The feature is designed to support flexible tracking where different exercises can have different measurable metrics.

The implementation follows a normalized database design using relational mappings between exercises, metrics, and workout logs.

---

# Tables Used

- `exercises`: Stores the list of supported exercises available in the application.
- `metrics`: Stores all measurable metrics that can be tracked.
- `exercise_metrics`: Acts as a mapping table between exercises and metrics. Defines which metrics are valid for a particular exercise.
- `exercise_logs`: Stores workout logs created by users. Each record represents a single exercise logged by a user at a specific time.
- `log_metrics`: Stores metric values associated with an exercise log. A single exercise log can contain multiple metric entries.

---

# Feature Flow

1. The user selects an exercise.
2. The backend fetches allowed metrics for that exercise using `exercise_metrics`.
3. The user enters metric values and submits the workout log.
4. A record is created in `exercise_logs`.
5. Metric values are stored in `log_metrics`.

---

# Implementation

The feature is implemented using:
- Entity classes for database mapping
- DAO repositories for CRUD operations
- Service layer for business logic
- REST controllers for API exposure

The architecture is designed to be flexible and extensible, allowing new exercises and metrics to be added without schema changes.

![img.png](img.png)