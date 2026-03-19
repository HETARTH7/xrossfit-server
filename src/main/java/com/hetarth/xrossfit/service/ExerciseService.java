package com.hetarth.xrossfit.service;

import com.hetarth.xrossfit.dto.workouttracker.ExerciseDTO;
import com.hetarth.xrossfit.entity.Exercise;

import java.util.List;
import java.util.Optional;

public interface ExerciseService {
    List<ExerciseDTO> getExercises();
    Optional<Exercise> getExerciseById(Long exerciseId);
}
