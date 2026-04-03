package com.hetarth.xrossfit.service.workouttracker;

import com.hetarth.xrossfit.dto.workouttracker.ExerciseDetails;
import com.hetarth.xrossfit.dto.workouttracker.ExerciseLogDTO;
import com.hetarth.xrossfit.dto.workouttracker.LogMetricResponse;
import com.hetarth.xrossfit.dto.workouttracker.MetricDTO;
import com.hetarth.xrossfit.dto.workouttracker.WorkoutLogDTO;
import com.hetarth.xrossfit.dto.workouttracker.WorkoutLogRequest;
import com.hetarth.xrossfit.dto.workouttracker.WorkoutLogResponse;
import com.hetarth.xrossfit.entity.Exercise;
import com.hetarth.xrossfit.entity.ExerciseLog;
import com.hetarth.xrossfit.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    public List<WorkoutLogResponse> getWorkoutLogs(Long userId) {
        List<WorkoutLogDTO> rawLogs =  exerciseLogService.findWorkoutLogsByUserId(userId);
        Map<Long, List<LogMetricResponse>> metricMap = new HashMap<>();
        Map<Long, ExerciseLogDTO> logMap = new HashMap<>();
        for (WorkoutLogDTO rawLog : rawLogs) {
            logMap.put(rawLog.getLogId(), createExerciseDTO(rawLog));

            List<LogMetricResponse> logMetricResponses = metricMap.getOrDefault(rawLog.getLogId(), new ArrayList<>());
            logMetricResponses.add(createLogMetricResponse(rawLog));
            metricMap.put(rawLog.getLogId(), logMetricResponses);
        }
        List<WorkoutLogResponse> logs = new ArrayList<>();
        logMap.forEach((logId, exerciseLogDTO) -> {
            WorkoutLogResponse workoutLogResponse = new WorkoutLogResponse();
            workoutLogResponse.setLogId(exerciseLogDTO.getLogId());
            workoutLogResponse.setExerciseName(exerciseLogDTO.getExerciseName());
            workoutLogResponse.setExerciseType(exerciseLogDTO.getExerciseType());
            workoutLogResponse.setTimestamp(exerciseLogDTO.getTimestamp());
            workoutLogResponse.setLogMetrics(metricMap.get(logId));
            logs.add(workoutLogResponse);
        });
        return logs;
    }

    private ExerciseLogDTO createExerciseDTO(WorkoutLogDTO workoutLogDTO) {
        return new ExerciseLogDTO(workoutLogDTO.getLogId(), workoutLogDTO.getExerciseName(), workoutLogDTO.getExerciseType(), workoutLogDTO.getTimestamp());
    }

    private LogMetricResponse createLogMetricResponse(WorkoutLogDTO dto) {
        LogMetricResponse logMetricResponse = new LogMetricResponse();
        logMetricResponse.setLogMetricId(dto.getLogMetricId());
        logMetricResponse.setMetricName(dto.getMetricName());
        logMetricResponse.setMetricUnit(dto.getMetricUnit());
        logMetricResponse.setMetricValue(dto.getMetricValue());
        return logMetricResponse;
    }
}
