package com.hetarth.xrossfit.controller;

import com.hetarth.xrossfit.dto.workouttracker.ExerciseDTO;
import com.hetarth.xrossfit.dto.workouttracker.ExerciseDetails;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface WorkoutTrackerController {
    ResponseEntity<List<ExerciseDTO>> getExercises();
    ResponseEntity<ExerciseDetails> getExerciseDetails(Long exerciseId);
}
