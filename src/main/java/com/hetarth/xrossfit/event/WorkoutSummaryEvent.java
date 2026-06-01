package com.hetarth.xrossfit.event;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WorkoutSummaryEvent {
    private String username;
    private String email;
    private int exerciseCount;
    private int totalSets;
    private int totalReps;
    private long durationMinutes;
    private double caloriesBurned;
    private double totalWeightLifted;
}
