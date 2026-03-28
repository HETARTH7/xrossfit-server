package com.hetarth.xrossfit.controller;

import com.hetarth.xrossfit.dto.workouttracker.ExerciseDTO;
import com.hetarth.xrossfit.dto.workouttracker.ExerciseDetails;
import com.hetarth.xrossfit.dto.workouttracker.WorkoutLogRequest;
import com.hetarth.xrossfit.entity.User;
import com.hetarth.xrossfit.service.workouttracker.ExerciseService;
import com.hetarth.xrossfit.service.workouttracker.WorkoutTrackerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/workout-tracker")
public class WorkoutTrackerController  {
    @Autowired
    private ExerciseService exerciseService;
    @Autowired
    private WorkoutTrackerService workoutTrackerService;

    @GetMapping("/exerciseNames")
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

    @GetMapping("/exerciseDetails/{exerciseId}")
    public ResponseEntity<ExerciseDetails> getExerciseDetails(@PathVariable Long exerciseId) {
        log.info("Getting exercise and metric details for exercise id: {}", exerciseId);
        try {
            ExerciseDetails exerciseDetails = workoutTrackerService.getExerciseDetails(exerciseId);
            log.info("Fetched exercise details for {}", exerciseDetails.getExerciseName());
            return ResponseEntity.ok(exerciseDetails);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/log")
    public ResponseEntity<String> logWorkout(@AuthenticationPrincipal User user, WorkoutLogRequest request) {
        try {
            workoutTrackerService.logWorkout(user, request);
            return ResponseEntity.ok().body("");
        } catch (Exception e) {
            log.error("{}", e.getMessage());
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
