package com.hetarth.xrossfit.service;

import com.hetarth.xrossfit.dto.workouttracker.ExerciseDetails;

public interface WorkoutTrackerService {
    ExerciseDetails getExerciseDetails(String exerciseName);
}
