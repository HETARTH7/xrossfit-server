package com.hetarth.xrossfit.dto.workouttracker;

import java.time.LocalDateTime;

public interface WorkoutLogDTO {
    Long getLogId();
    String getExerciseName();
    String getExerciseType();
    LocalDateTime getTimestamp();
    Long getLogMetricId();
    String getMetricName();
    Double getMetricValue();
    String getMetricUnit();
}
