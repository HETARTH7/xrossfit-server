package com.hetarth.xrossfit.service.workouttracker;

import com.hetarth.xrossfit.dao.ExerciseDAO;
import com.hetarth.xrossfit.dto.workouttracker.ExerciseDTO;
import com.hetarth.xrossfit.entity.Exercise;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExerciseService {
    @Autowired
    private ExerciseDAO exerciseDAO;

    public List<ExerciseDTO> getExercises() {
        return exerciseDAO.getExercises();
    }

    public Optional<Exercise> getExerciseById(Long exerciseId) {
        return exerciseDAO.findById(exerciseId);
    }
}
