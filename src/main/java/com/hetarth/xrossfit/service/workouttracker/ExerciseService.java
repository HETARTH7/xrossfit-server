package com.hetarth.xrossfit.service.workouttracker;

import com.hetarth.xrossfit.dao.ExerciseDAO;
import com.hetarth.xrossfit.dto.workouttracker.ExerciseDTO;
import com.hetarth.xrossfit.entity.Exercise;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExerciseService {
    private final ExerciseDAO exerciseDAO;

    public List<ExerciseDTO> getExercises() {
        return exerciseDAO.getExercises();
    }

    public Optional<Exercise> getExerciseById(Long exerciseId) {
        return exerciseDAO.findById(exerciseId);
    }
}
