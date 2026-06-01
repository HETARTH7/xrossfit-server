package com.hetarth.xrossfit.service.workouttracker;

import com.hetarth.xrossfit.dto.notification.UserDTO;
import com.hetarth.xrossfit.dto.workouttracker.ExerciseDetails;
import com.hetarth.xrossfit.dto.workouttracker.ExerciseLogDTO;
import com.hetarth.xrossfit.dto.workouttracker.LogMetricResponse;
import com.hetarth.xrossfit.dto.workouttracker.MetricDTO;
import com.hetarth.xrossfit.dto.workouttracker.WorkoutLogDTO;
import com.hetarth.xrossfit.dto.workouttracker.WorkoutLogRequest;
import com.hetarth.xrossfit.dto.workouttracker.WorkoutLogResponse;
import com.hetarth.xrossfit.event.WorkoutSummaryEvent;
import com.hetarth.xrossfit.entity.Exercise;
import com.hetarth.xrossfit.entity.ExerciseLog;
import com.hetarth.xrossfit.entity.User;
import com.hetarth.xrossfit.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class WorkoutTrackerService {
    private final UserService userService;
    private final ExerciseService exerciseService;
    private final MetricService metricService;
    private final ExerciseLogService exerciseLogService;
    private final LogMetricService logMetricService;
    private final ApplicationEventPublisher publisher;

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

    @Scheduled(cron = "0 * * * * *")
    public void getDailyWorkoutSummary() {
        log.info("Getting daily workout summary");
        LocalDate yesterday = LocalDate.now().minusDays(1);
        List<UserDTO> users = userService.getUserIds();

        for (UserDTO user : users) {
            List<WorkoutLogDTO> logs = exerciseLogService.findWorkoutLogsByUserId(user.getId());
            List<WorkoutLogDTO> yesterdayLogs = logs.stream()
                    .filter(log -> log.getTimestamp()
                            .toLocalDate()
                            .equals(yesterday))
                    .toList();

            Map<Long, Map<String, Double>> metricsByLogId = new HashMap<>();

            Set<Long> uniqueLogIds = new HashSet<>();

            int totalSets = 0;
            int totalReps = 0;
            double totalCalories = 0;
            double totalDuration = 0;

            for (WorkoutLogDTO log : yesterdayLogs) {
                uniqueLogIds.add(log.getLogId());

                String metricName = log.getMetricName();
                Double metricValue = log.getMetricValue();

                if (metricName == null || metricValue == null) {
                    continue;
                }

                switch (metricName.toLowerCase()) {
                    case "sets" -> totalSets += metricValue.intValue();
                    case "reps" -> totalReps += metricValue.intValue();
                    case "calories" -> totalCalories += metricValue;
                    case "duration" -> totalDuration += metricValue;
                }
                metricsByLogId.computeIfAbsent(log.getLogId(), k -> new HashMap<>()).put(metricName.toLowerCase(), metricValue);
            }

            double totalWeightLifted = 0;

            for (Map<String, Double> metrics : metricsByLogId.values()) {
                Double weight = metrics.get("weight");
                Double reps = metrics.get("reps");
                if (weight != null && reps != null) {
                    totalWeightLifted += weight * reps;
                }
            }

            WorkoutSummaryEvent summary = WorkoutSummaryEvent.builder()
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .exerciseCount(uniqueLogIds.size())
                    .totalSets(totalSets)
                    .totalReps(totalReps)
                    .durationMinutes(Math.round(totalDuration))
                    .caloriesBurned(totalCalories)
                    .totalWeightLifted(totalWeightLifted)
                    .build();

            publisher.publishEvent(summary);
        }
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
