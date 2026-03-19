package com.hetarth.xrossfit.service.impl;

import com.hetarth.xrossfit.dto.workouttracker.ExerciseDetails;
import com.hetarth.xrossfit.entity.Exercise;
import com.hetarth.xrossfit.service.ExerciseService;
import com.hetarth.xrossfit.service.WorkoutTrackerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WorkoutTrackerServiceImpl implements WorkoutTrackerService {
    @Autowired
    private ExerciseService exerciseService;
    @Override
    public ExerciseDetails getExerciseDetails(Long exerciseId) throws Exception {
        Optional<Exercise> exerciseOptional = exerciseService.getExerciseById(exerciseId);
        if(exerciseOptional.isEmpty()){
            throw new Exception("No exercise found with id: " + exerciseId);
        }
        ExerciseDetails exerciseDetails = new ExerciseDetails();
        Exercise exercise = exerciseOptional.get();
        exerciseDetails.setExerciseName(exercise.getExerciseName());
        exerciseDetails.setExerciseType(exercise.getExerciseType());
        return exerciseDetails;
    }
}
