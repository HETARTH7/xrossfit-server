package com.hetarth.xrossfit.service.workouttracker;

import com.hetarth.xrossfit.dao.ExerciseLogDAO;
import com.hetarth.xrossfit.entity.ExerciseLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExerciseLogService {
    @Autowired
    private ExerciseLogDAO exerciseLogDAO;

    public ExerciseLog logWorkout(ExerciseLog log) {
        return exerciseLogDAO.save(log);
    }
}
