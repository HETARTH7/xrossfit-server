package com.hetarth.xrossfit.dto.workouttracker;

public interface WorkoutLogDTO {
    Long getLogId();
    String getExerciseName();
    String getExerciseType();
    String getMetricName();
    Double getMetricValue();
    String getMetricUnit();
}
