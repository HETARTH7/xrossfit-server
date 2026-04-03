package com.hetarth.xrossfit.service.workouttracker;

import com.hetarth.xrossfit.dto.workouttracker.ExerciseDetails;
import com.hetarth.xrossfit.dto.workouttracker.MetricDTO;
import com.hetarth.xrossfit.dto.workouttracker.WorkoutLogDTO;
import com.hetarth.xrossfit.dto.workouttracker.WorkoutLogRequest;
import com.hetarth.xrossfit.entity.Exercise;
import com.hetarth.xrossfit.entity.ExerciseLog;
import com.hetarth.xrossfit.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
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
        ExerciseLog exerciseLog = new ExerciseLog();
        Optional<Exercise> exercise = exerciseService.getExerciseById(request.getExerciseId());
        if(exercise.isEmpty()) {
            throw new RuntimeException("Invalid Exercise");
        }
        exerciseLog.setUser(user);
        exerciseLog.setExercise(exercise.get());
        exerciseLog.setLoggedAt(request.getLoggedAt());
        log.info("Saving the exercise logs...");
        ExerciseLog savedLog = exerciseLogService.logWorkout(exerciseLog);
        log.info("Saving the exercise log metrics..");
        logMetricService.logExerciseMetrics(request.getMetrics(), savedLog);
    }

    public List<WorkoutLogDTO> getWorkoutLogs(Long userId) {
        return exerciseLogService.findWorkoutLogsByUserId(userId);
    }
}
