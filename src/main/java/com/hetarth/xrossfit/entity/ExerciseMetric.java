package com.hetarth.xrossfit.entity;

import com.hetarth.xrossfit.utils.ExerciseMetricId;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "exercise_metrics")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseMetric {
    @EmbeddedId
    private ExerciseMetricId id;
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("exerciseId")
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("metricId")
    @JoinColumn(name = "metric_id")
    private Metric metric;
}
