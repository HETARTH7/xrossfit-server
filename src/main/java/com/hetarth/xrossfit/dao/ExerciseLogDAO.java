package com.hetarth.xrossfit.dao;

import com.hetarth.xrossfit.dto.workouttracker.WorkoutLogDTO;
import com.hetarth.xrossfit.entity.ExerciseLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExerciseLogDAO extends JpaRepository<ExerciseLog, Long> {
    @Query(value = """
        SELECT 
            log.id AS logId,
            ex.exercise_name AS exerciseName,
            ex.exercise_type AS exerciseType,
            m.name AS metricName,
            lm.value AS metricValue,
            m.unit AS metricUnit
        FROM exercise_logs log
        JOIN exercises ex ON log.exercise_id = ex.id
        JOIN log_metrics lm ON lm.log_id = log.id
        JOIN metrics m ON lm.metric_id = m.id
        WHERE log.user_id = :userId
        """,
            nativeQuery = true)
    List<WorkoutLogDTO> findWorkoutLogsByUserId(@Param("userId") Long userId);
}
