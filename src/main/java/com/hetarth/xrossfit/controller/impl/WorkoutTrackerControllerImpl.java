package com.hetarth.xrossfit.controller.impl;

import com.hetarth.xrossfit.controller.WorkoutTrackerController;
import com.hetarth.xrossfit.service.ExerciseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public ResponseEntity<List<String>> getExerciseNames() {
        log.info("Getting all exercise names");
        try {
            List<String> exerciseNames = exerciseService.getExerciseNames();
            log.info("Fetched {} exercises names", exerciseNames.size());
            return ResponseEntity.ok(exerciseNames); // Status Code 200
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Error code 500
        }
    }
}
