package com.hetarth.xrossfit.dto.workouttracker;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter @Getter
public class ExerciseDetails {
    private String exerciseName;
    private String exerciseType;
    private List<MetricDTO> metrics;
}
