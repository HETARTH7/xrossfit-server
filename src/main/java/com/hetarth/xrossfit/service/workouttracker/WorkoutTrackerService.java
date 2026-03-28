package com.hetarth.xrossfit.service.workouttracker;

import com.hetarth.xrossfit.dto.workouttracker.ExerciseDetails;
import com.hetarth.xrossfit.dto.workouttracker.MetricDTO;
import com.hetarth.xrossfit.dto.workouttracker.WorkoutLogRequest;
import com.hetarth.xrossfit.entity.Exercise;
import com.hetarth.xrossfit.entity.ExerciseLog;
import com.hetarth.xrossfit.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class WorkoutTrackerService {
    @Autowired
    private ExerciseService exerciseService;
    @Autowired
    private MetricService metricService;
    @Autowired
    private ExerciseLogService exerciseLogService;
    @Autowired
    private LogMetricService logMetricService;

    public ExerciseDetails getExerciseDetails(Long exerciseId) {
        try {
            Optional<Exercise> exerciseOptional = exerciseService.getExerciseById(exerciseId);
            if (exerciseOptional.isEmpty()) {
                throw new Exception("No exercise found with id: " + exerciseId);
            }
            List<MetricDTO> metrics = metricService.findMetricsByExerciseId(exerciseId);
            ExerciseDetails exerciseDetails = new ExerciseDetails();
            Exercise exercise = exerciseOptional.get();
            exerciseDetails.setExerciseName(exercise.getExerciseName());
            exerciseDetails.setExerciseType(exercise.getExerciseType());
            exerciseDetails.setMetrics(metrics);
            return exerciseDetails;
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public void logWorkout(User user, WorkoutLogRequest request) {
        ExerciseLog log = new ExerciseLog();
        Optional<Exercise> exercise = exerciseService.getExerciseById(request.getExerciseId());
        if(exercise.isEmpty()) {
            throw new RuntimeException("Invalid Exercise");
        }
        log.setUser(user);
        log.setExercise(exercise.get());
        log.setLoggedAt(request.getLoggedAt());
        ExerciseLog savedLog = exerciseLogService.logWorkout(log);
        logMetricService.logExerciseMetrics(request.getMetrics(), savedLog);
    }
}
