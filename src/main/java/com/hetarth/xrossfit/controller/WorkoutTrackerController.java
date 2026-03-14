package com.hetarth.xrossfit.controller;

import org.springframework.http.ResponseEntity;

import java.util.List;

public interface WorkoutTrackerController {
    ResponseEntity<List<String>> getExerciseNames();
}
