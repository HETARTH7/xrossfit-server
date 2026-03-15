package com.hetarth.xrossfit.service;

import com.hetarth.xrossfit.dto.workouttracker.ExerciseDTO;

import java.util.List;

public interface ExerciseService {
    List<ExerciseDTO> getExercises();
}
