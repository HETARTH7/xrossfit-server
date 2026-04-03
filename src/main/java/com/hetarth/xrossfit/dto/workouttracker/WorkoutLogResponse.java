package com.hetarth.xrossfit.dto.workouttracker;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
public class WorkoutLogResponse {
    private Long logId;
    private String exerciseName;
    private String exerciseType;
    private LocalDateTime timestamp;
    private List<LogMetricResponse> logMetrics;
}
