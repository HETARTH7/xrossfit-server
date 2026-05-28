package com.hetarth.xrossfit.dao;

import com.hetarth.xrossfit.dto.workouttracker.MetricDTO;
import com.hetarth.xrossfit.entity.Exercise;
import com.hetarth.xrossfit.entity.ExerciseMetric;
import com.hetarth.xrossfit.entity.Metric;
import com.hetarth.xrossfit.utils.ExerciseMetricId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class MetricDAOTest {

    @Autowired
    private MetricDAO metricDAO;

    @Autowired
    private ExerciseDAO exerciseDAO;

    @Autowired
    private ExerciseMetricDAO exerciseMetricDAO;

    @Test
    void shouldFetchMetricsByExerciseId() {

        // Arrange

        Exercise exercise = new Exercise();
        exercise.setExerciseName("Bench Press");
        exercise.setExerciseType("CHEST");

        Exercise savedExercise = exerciseDAO.save(exercise);

        Metric metric1 = new Metric();
        metric1.setName("Weight");
        metric1.setUnit("kg");

        Metric metric2 = new Metric();
        metric2.setName("Reps");
        metric2.setUnit("count");

        Metric savedMetric1 = metricDAO.save(metric1);
        Metric savedMetric2 = metricDAO.save(metric2);

        ExerciseMetricId id1 = new ExerciseMetricId(
                savedExercise.getId(),
                savedMetric1.getId()
        );

        ExerciseMetric exerciseMetric1 = new ExerciseMetric();
        exerciseMetric1.setId(id1);
        exerciseMetric1.setExercise(savedExercise);
        exerciseMetric1.setMetric(savedMetric1);

        ExerciseMetricId id2 = new ExerciseMetricId(
                savedExercise.getId(),
                savedMetric2.getId()
        );

        ExerciseMetric exerciseMetric2 = new ExerciseMetric();
        exerciseMetric2.setId(id2);
        exerciseMetric2.setExercise(savedExercise);
        exerciseMetric2.setMetric(savedMetric2);

        exerciseMetricDAO.save(exerciseMetric1);
        exerciseMetricDAO.save(exerciseMetric2);

        // Act

        List<MetricDTO> metrics =
                metricDAO.findMetricsByExerciseId(savedExercise.getId());

        // Assert

        assertThat(metrics).isNotNull();
        assertThat(metrics).hasSize(2);

        assertThat(metrics)
                .extracting(MetricDTO::getName)
                .containsExactlyInAnyOrder("Weight", "Reps");

        assertThat(metrics)
                .extracting(MetricDTO::getUnits)
                .containsExactlyInAnyOrder("kg", "count");
    }

    @Test
    void shouldReturnEmptyListWhenNoMetricsMapped() {

        // Arrange

        Exercise exercise = new Exercise();
        exercise.setExerciseName("Deadlift");
        exercise.setExerciseType("BACK");

        Exercise savedExercise = exerciseDAO.save(exercise);

        // Act

        List<MetricDTO> metrics =
                metricDAO.findMetricsByExerciseId(savedExercise.getId());

        // Assert

        assertThat(metrics).isNotNull();
        assertThat(metrics).isEmpty();
    }
}