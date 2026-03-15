package com.hetarth.xrossfit.controller.impl;

import com.hetarth.xrossfit.controller.WorkoutTrackerController;
import com.hetarth.xrossfit.dto.workouttracker.ExerciseDTO;
import com.hetarth.xrossfit.dto.workouttracker.ExerciseDetails;
import com.hetarth.xrossfit.service.ExerciseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/workout-tracker")
public class WorkoutTrackerControllerImpl implements WorkoutTrackerController {
    @Autowired
    private ExerciseService exerciseService;

    @GetMapping("/exerciseNames")
    @Override
    public ResponseEntity<List<ExerciseDTO>> getExercises() {
        log.info("Getting all exercise names");
        try {
            List<ExerciseDTO> exerciseNames = exerciseService.getExercises();
            log.info("Number of exercise names fetched: {}", exerciseNames.size());
            return ResponseEntity.ok(exerciseNames);
        } catch (Exception e) {
            log.error("Error fetching exercises. {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @Override
    public ResponseEntity<ExerciseDetails> getExerciseDetails(@RequestParam String exerciseName) {
        log.info("Getting exercise and metric details for: {}", exerciseName);
        try {
            return ResponseEntity.ok(new ExerciseDetails());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
