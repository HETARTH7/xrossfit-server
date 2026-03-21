package com.hetarth.xrossfit.dao;

import com.hetarth.xrossfit.dto.workouttracker.MetricDTO;
import com.hetarth.xrossfit.entity.Metric;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MetricDAO extends JpaRepository<Metric, Long> {
    @Query("""
    SELECT m.id AS id,
           m.name AS name,
           m.unit AS units
    FROM Metric m
    JOIN ExerciseMetric em ON m.id = em.metric.id
    WHERE em.exercise.id = :exerciseId
""")
    List<MetricDTO> findMetricsByExerciseId(@Param("exerciseId") Long exerciseId);
}
