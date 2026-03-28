package com.hetarth.xrossfit.dto.workouttracker;

import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class WorkoutLogRequest {
    private Long exerciseId;
    private LocalDateTime loggedAt;
    private List<MetricValueRequest> metrics;
}
