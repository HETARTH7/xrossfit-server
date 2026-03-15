package com.hetarth.xrossfit.service.impl;

import com.hetarth.xrossfit.dao.ExerciseDAO;
import com.hetarth.xrossfit.dto.workouttracker.ExerciseDTO;
import com.hetarth.xrossfit.service.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseServiceImpl implements ExerciseService {
    @Autowired
    private ExerciseDAO exerciseDAO;

    @Override
    public List<ExerciseDTO> getExercises() {
        return exerciseDAO.getExercises();
    }
}
